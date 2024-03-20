---
lang: en
type: "post"
title: "Add git commit info to your Elixir Phoenix app"
author: "Diego Calero"
slug: "/add-git-commit-info-to-your-elixir-phoenix-app"
date: "2019-07-15"
image:  ../images/alchimia.jpg
imageCredits: "Créditos de imagen unsplash"
tags: ["Elixir", "Phoenix", "programming"]
---

Hi there! We’d like to share how to add git repo information to an [Elixir](https://elixir-lang.org/) application. In our use case, we wanted to add last commit hash and date to be displayed at [Live Qchatex](https://github.com/fiqus/lqchatex) app footer, but it wasn’t as trivial as we expected.

The basic idea was to rely on git console commands to get the desired information:

```elixir
defp get_commit_sha() do
  System.cmd("git", ["rev-parse", "HEAD"])
  |> elem(0)
  |> String.trim()
end

defp get_commit_date() do
  [sec, tz] =
    System.cmd("git", ~w|log -1 --date=raw --format=%cd|)
    |> elem(0)
    |> String.split(~r/\s+/, trim: true)
    |> Enum.map(&String.to_integer/1)

  DateTime.from_unix!(sec + tz * 36)
end
```

That’s pretty easy! BUT, only works as long as the `.git` directory lives within the same directory where your app is started (ie: at runtime).
In cases like building a [mix release](https://elixir-lang.org/blog/2019/06/24/elixir-v1-9-0-released/) or deploying the code to [gigalixir](https://gigalixir.com/), things started to get complicated!

Besides not having the .git directory, we didn’t like the idea of calling `System.cmd(...)` to get the git repo data each time we wanted to display that information at frontend.
Sounds a little expensive and makes not much sense, right?
So, how can we improve this in order to NOT rely on .git directory and to avoid issuing nosense syscalls?

# The ‘VERSION’ file

One solution that came to mind was to **write the git repo info to a static file** and then **read it when the app starts**. Now the question is: **when and where** to do such things?

# Write the ‘VERSION’ file

One approach is to “override” the mix task `mix deps.get` and call a function that will get the git repo info and saves it every time the dependencies are updated.
This can be easily done at `mix.exs`:

```elixir
defmodule MyApp.MixProject do
  use Mix.Project

  def project do
    [
      app: :my_app,
      version: version(),
      aliases: aliases(),
      ...
    ]
  end

  defp version, do: "1.1.1"

  ...

  defp aliases do
    [
      "deps.get": ["deps.get", &update_version/1]
    ]
  end

  defp update_version(_) do
    contents = [
      version(),
      get_commit_sha(),
      get_commit_date()
    ]

    Mix.shell().info("Updating version with: #{inspect(contents)}")
    File.write("VERSION", Enum.join(contents, "\n"), [:write])
  end

  defp get_commit_sha() do
    System.cmd("git", ["rev-parse", "HEAD"])
    |> elem(0)
    |> String.trim()
  end

  defp get_commit_date() do
    [sec, tz] =
      System.cmd("git", ~w|log -1 --date=raw --format=%cd|)
      |> elem(0)
      |> String.split(~r/\s+/, trim: true)
      |> Enum.map(&String.to_integer/1)

    DateTime.from_unix!(sec + tz * 36)
  end
end
```

NOTE: Don’t forget to add `/VERSION` it to `.gitignore`!

Surelly, that approach can be improved to ensure updating the version every time the app is deployed no matter the “deployment mode” you may choose (ie: running `mix release` it will NOT update the version, despite we could add that alias to be overriden too..?).
Suggestions are welcome! =]

# Read the ‘VERSION’ file

Again, one approach is to read and parse the VERSION file contents at application start.
To do that, we add some lines to `application.ex` file:

```elixir
defmodule MyApp.Application do
  use Application
  require Logger

  def start(_type, _args) do
    # Load application version
    load_version()
    ...
  end

  def version, do: Application.get_env(:my_app, :version)
  def version(key), do: version()[key]

  defp load_version() do
    [vsn, hash, date] =
      case File.read("VERSION") do
        {:ok, data} -> data |> String.split("\n")
        _ -> [nil, nil, nil]
      end

    version = %{vsn: vsn, hash: hash, date: date}
    Logger.info("Loading app version: #{inspect(version)}")
    Application.put_env(:my_app, :version, version)
  end
end
```

That way we archieved to load the version info and to set it at application env scope by doing:

`Application.put_env(:my_app, :version, version)`

Now, to retrieve the version values at runtime, we could directly call:

`Application.get_env(:my_app, :version)`

But we added a little helper to abstract it a little:

`MyApp.Application.version()`

# Displaying the version info in a Phoenix View

We could add some code to the `layout_view.ex` in order to easily display the current version info in a view:

```elixir
defmodule MyApp.LayoutView do
  use MyAppWeb, :view

  def render_version(),
    do: "MyApp <b>v#{get_app_version()}.#{get_commit_date()}</b> at #{get_commit_link()}"

  def repo_url(path \\ ""),
    do: Application.get_env(:my_app, MyAppWeb.Endpoint)[:repo] <> path

  defp get_app_version(), do: Application.spec(:my_app, :vsn)
  defp get_commit_sha(), do: MyApp.Application.version(:hash)
  defp get_commit_date(), do: MyApp.Application.version(:date)

  defp get_commit_link() do
    commit_sha = get_commit_sha()
    path = "/commit/#{commit_sha}"

    "<a href=\"#{repo_url(path)}\" target=\"_blank\">##{commit_sha}</a>"
  end
end
```

NOTE: The function `get_commit_link()` calls `repo_url(path)` that gets the repo url from a custom config param manually set:
`Application.get_env(:my_app, MyAppWeb.Endpoint)[:repo]`
By having defined at `config.exs`:

```elixir
config :my_app, MyAppWeb.Endpoint,
  environment: Mix.env(),
  repo: "https://github.com/my_repo"
```

And lastly, in a view template like `app.html.eex` just add:

```elixir
<footer><%= raw render_version() %></footer>
```

# ..and voilà!
It should print something like:

`MyApp v0.1.1.2019-07-14 17:12:51Z at #c76563d34...`

Hope it helped someone and please feel free to post your comments and suggestions! =]