---
lang: en
type: "post"
title: "PhruzzMatcher"
author: "Martín Vallone"
slug: "/phruzz-matcher"
date: "2021-10-05"
image:  ../images/matrix-header.jpg
imageCredits: "unsplash"
tags: ["spacy", "nlp", "ner"]
---

 
# PhruzzMatcher

## TL;DR
How to detect phrases that don't necessarily match a list of values they should match? Spacy, RapidFuzz, NER and other weeds all mixed together.


## How did we get here?
In the last time we have been working intercooperatively in IA² [0] , an open source software that integrates a set of tools developed to facilitate transparency in institutions and strengthen the link with citizens through the anonymization of court judgments and the extraction of data obtained through NER (Named Entity Recognition).
Partly because of the experience that this project offered us and because of the links we made, we also worked with CIECTI [1] (Interdisciplinary Center for Studies in Science, Technology and Innovation) on a prototype for anonymization of EHR (Electronic Health Records).

## ¡Now we are ready!
And it is about this project that I wanted to talk to you! (but a brief introduction was needed)
Among the requirements of this prototype we had to develop was the need to detect EPoF (Rare Diseases). These diseases are registered nationally here [2], so one approach to their detection was to put together a list of EPoF and see which of them appeared in the texts to be anonymized.

![epofs](../images/phruzz-matcher-01.png)

After a bit of scraping [3], we generated a csv file with these diseases. Now we had to find out which component Spacy [4] offered us to detect them. 
It is worth clarifying that both in IA² and in this prototype for CIECTI, we used Spacy for its capacity in the development of models for production, the performance it offers, the robustness and the freedoms offered by its Open Source quality.
The pre-trained models offered by SpaCy offer a reasonable cost/benefit ratio, understanding cost as computational cost of training models and benefit as model prediction accuracy.
Having said that, in our search for a component, we found that the one that came closest was the PhraseMatcher [5]. This Spacy component allows you to efficiently match large lists of terminology; it accepts matching patterns in the form of Doc objects [6]. 
The problem is that it is only useful if what you are looking for (an EPoF in this case) appears exactly as it was written in the text, i.e., there can be nothing different (much less a typo or an abbreviation that was not considered in the EPoF listing). 
Have you ever seen health care personnel typing a medical record? Maybe not directly, but surely you were in front of a person typing fast on a computer and at the same time asking questions, which raises suspicions about the existence of typing errors, abbreviations and who knows how many other peculiarities in what they wrote.
That is why it is necessary to incorporate "something" that allows some flexibility about what you are looking for, after looking for alternatives... [7] 

## Houston we have a problem, or not!

![issue-spacy](../images/phruzz-matcher-02.png)

Fortunately the problem quickly disappeared, RapidFuzz appeared! [8] A fast string-matching library. It uses the Levenshtein distance [9] to calculate the differences between sequences in a simple way and is faster than its direct competitor FuzzyWuzzy [10] (see benchmark [11]).
Whereas EPoFs are taken from a csv file that was generated from information found on the internet, but does not consider the various ways in which people may refer to them.
Finally, this library was added to be able to detect cases in which there is not a perfect match between tokens [12] and diseases in the EPoF list.
But not everything is so simple or perfect, the way to evaluate the coincidence is by comparing the "distance" that separates the EPoF and the fragment of the EHR analyzed with a percentage of "flexibility / tolerance" configured by us.
The lower the value of this tolerance percentage is configured, the higher the tolerance of the component to detect EPoF; we must be aware that a too low value may cause many possible matches to be found, resulting in overprocessing to identify such diseases.
The code implementing the above was extracted to a separate component so that it could be used by whoever needs it (see the component's Github [13] and the component in Pypi [14]), as well as to be published in the Spacy universe [15].

 
## Conclusions
Both Spacy's PhraseMatcher and RapidFuzz are very useful but must be accompanied with a proper analysis aligned with the established objectives. A wrong use of these components could lead to the generation of a large number of "false positives" (detections of entities where in fact there is no entity). 
This may not be a problem, as long as it does not impair the reading of a clinical history or make it impossible to understand what it is trying to convey.
We suggest analyzing the way people write in order to enrich the EPoF list, as well as any other elements of the code that have been created based on the texts that could be analyzed (for example, we found that they wrote "tto" to refer to "treatment").
The prototype code made for CIECTI can be found on the project's GitHub [16].



## Sources and references
0: [IA²](https://www.ia2.coop/)<br/>
1: [CIECTI | Centro Interdisciplinario de Estudios en Ciencia, Tecnología e Innovación](http://www.ciecti.org.ar/)<br/>
2: [Listado de enfermedades poco frecuentes en Argentina](https://www.argentina.gob.ar/salud/pocofrecuentes/listado)<br/>
3: [Web scraping](https://es.wikipedia.org/wiki/Web_scraping)<br/>
4: [Language Processing Pipelines · spaCy Usage Documentation](https://spacy.io/usage/processing-pipelines)<br/>
5: [PhraseMatcher · spaCy API Documentation](https://spacy.io/api/phrasematcher)<br/>
6: [Doc · spaCy API Documentation](https://spacy.io/api/doc)<br/>
7: [Fuzzy (partial) matching with PhraseMatcher (NER task) - usage](https://support.prodi.gy/t/fuzzy-partial-matching-with-phrasematcher-ner-task/1084/8)<br/>
8: https://github.com/maxbachmann/RapidFuzz<br/>
9: [Distancia de Levenshtein](https://es.wikipedia.org/wiki/Distancia_de_Levenshtein)<br/>
10: https://github.com/seatgeek/fuzzywuzzy<br/>
11: [maxbachmann/RapidFuzz: Rapid fuzzy string matching in Python using various string metrics](https://github.com/maxbachmann/RapidFuzz#benchmark)<br/>
12: A token is an instance of a sequence of characters in some particular document that is grouped together as a semantic unit useful for processing. So by "token" we mean a word, punctuation mark, space, etc.<br/>
13: https://github.com/mjvallone/phruzz-matcher<br/>
14: https://pypi.org/project/phruzz-matcher/<br/>
15: https://spacy.io/universe/project/phruzz_matcher<br/>
16: https://github.com/instituciones-abiertas/anonimizacion-texto-libre<br/>
