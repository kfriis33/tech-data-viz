from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    txt = create_text_file(filepath, txtoutfilepath)
    count_from_text_file(txt, countoutfilepath, minwords)

    count_verbs(filepath, verbfilepath, countverbfilepath, minpos)

    textblob_adj(txt, posoutfilepath, countposoutfilepath, minpos)

create_counts(20, 10, 'data/defense2/defense2.csv', 'data/defense2/defense.txt', 'data/defense2/word_counts_defense.csv', 'data/defense2/defenseAdj.txt', 'data/defense2/adj_counts_defense.csv', 'data/defense2/defenseVerbs.txt', 'data/defense2/verb_counts_defense.csv')