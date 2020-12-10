from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    #txt = create_text_file(filepath, txtoutfilepath)
    #count_from_text_file(txtoutfilepath, countoutfilepath, minwords)

    #count_verbs(txtoutfilepath, verbfilepath, countverbfilepath, minpos)

    textblob_adj(txtoutfilepath, posoutfilepath, countposoutfilepath, minpos)

# create_counts(90, 30, 'src/data/scraping_data/intercept_all.csv', 'src/data/raw-text/intercept_all.txt', 'src/data/counts/total_counts/intercept_total_counts.csv', 'src/data/raw-text/intercept_adj.txt', 'src/data/counts/adj_counts/intercept_adj_counts.csv', 'src/data/raw-text/intercept_verbs.txt', 'src/data/counts/verb_counts/intercept_verb_counts.csv')

def create_agg_counts(inlist, outlist, minwords):
    counter = 0
    for item in inlist:
        count_from_text_file(item, outlist[counter], minwords)
        counter+=1

create_agg_counts(['src/data/raw-text/academia.txt', 'src/data/raw-text/academia_adj.txt', 'src/data/raw-text/academia_verbs.txt'], ['src/data/counts/total_counts/academia_total_counts.csv', 'src/data/counts/adj_counts/academia_adj_counts.csv', 'src/data/counts/verb_counts/academia_verb_counts.csv'], 100)