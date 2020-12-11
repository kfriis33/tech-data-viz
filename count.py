from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    #txt = create_text_file(filepath, txtoutfilepath)
    #count_from_text_file(txtoutfilepath, countoutfilepath, minwords)

    #count_verbs(txtoutfilepath, verbfilepath, countverbfilepath, minpos)

    textblob_adj(txtoutfilepath, posoutfilepath, countposoutfilepath, minpos)

#create_counts(90, 30, 'src/data/scraping_data/brown_cs.csv', 'src/data/raw-text/brown_cs.txt', 'src/data/counts/total_counts/intercept_total_counts.csv', 'src/data/raw-text/browncs_adj.txt', 'src/data/counts/adj_counts/brown_adj_counts.csv', 'src/data/raw-text/intercept_verbs.txt', 'src/data/counts/verb_counts/intercept_verb_counts.csv')

def create_agg_counts(inlist, outlist, minwords):
    count_from_text_file(inlist[0], outlist[0], minwords)
    textblob_adj(inlist[0], inlist[1], outlist[1], minwords)
    count_verbs(inlist[0], inlist[2], outlist[2], minwords)


create_agg_counts(['src/data/raw-text/companies.txt', 'src/data/raw-text/companies_adj.txt', 'src/data/raw-text/companies_verbs.txt'], ['src/data/counts/total_counts/companies_total_counts.csv', 'src/data/counts/adj_counts/companies_adj_counts.csv', 'src/data/counts/verb_counts/companies_verb_counts.csv'], 20)
create_agg_counts(['src/data/raw-text/news.txt', 'src/data/raw-text/news_adj.txt', 'src/data/raw-text/news_verbs.txt'], ['src/data/counts/total_counts/news_total_counts.csv', 'src/data/counts/adj_counts/news_adj_counts.csv', 'src/data/counts/verb_counts/news_verb_counts.csv'], 100)
create_agg_counts(['src/data/raw-text/defense.txt', 'src/data/raw-text/defense_adj.txt', 'src/data/raw-text/defense_verbs.txt'], ['src/data/counts/total_counts/defense_total_counts.csv', 'src/data/counts/adj_counts/defense_adj_counts.csv', 'src/data/counts/verb_counts/defense_verb_counts.csv'], 100)
