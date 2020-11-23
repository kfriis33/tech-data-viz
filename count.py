from pos import textblob_adj 
from pos import count_verbs 
from count_words import create_text_file 
from count_words import count_from_text_file 

def create_counts(minwords, minpos, filepath, txtoutfilepath, countoutfilepath, posoutfilepath, countposoutfilepath, verbfilepath, countverbfilepath):
    txt = create_text_file(filepath, txtoutfilepath)
    count_from_text_file(txt, countoutfilepath, minwords)

    count_verbs(filepath, verbfilepath, countverbfilepath, minpos)

    pos = textblob_adj(txt, posoutfilepath)
    count_from_text_file(pos, countposoutfilepath, minpos)
