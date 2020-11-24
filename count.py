from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    txt = create_text_file(filepath, txtoutfilepath)
    count_from_text_file(txt, countoutfilepath, minwords)

    count_verbs(filepath, verbfilepath, countverbfilepath, minpos)

    textblob_adj(txt, posoutfilepath, countposoutfilepath, minpos)

create_counts(20, 5, 'data/yCombinator.csv', 'data/ycomb/ycomb.txt', 'data/ycomb/word_counts_ycomb.csv', 'data/ycomb/ycombAdj.txt', 'data/ycomb/adj_count_ycomb.csv', 'data/ycomb/ycombVerbs.txt', 'data/ycomb/verb_counts_ycomb.csv')