from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    txt = create_text_file(filepath, txtoutfilepath)
    count_from_text_file(txt, countoutfilepath, minwords)

    count_verbs(filepath, verbfilepath, countverbfilepath, minpos)

    textblob_adj(txt, posoutfilepath, countposoutfilepath, minpos)

create_counts(70, 30, 'data/scraping_data/angel_all.csv', 'data/raw-text/angel_all.txt', 'data/counts/total_counts/angelall_total_counts.csv', 'data/raw-text/angelall_adj.txt', 'data/counts/adj_counts/angelall_adj_counts.csv', 'data/raw-text/angelall_verbs.txt', 'data/counts/verb_counts/angelall_verb_counts.csv')