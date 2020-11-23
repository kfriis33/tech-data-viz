from textblob import TextBlob
from textblob import Word
from collections import Counter
import sys  
from importlib import reload
reload(sys)  
sys.getdefaultencoding() # use this for Python3
from textblob import TextBlob
from count_words import count_from_text_file 




def textblob_adj(filepath, outfilepath, countfilepath, minpos):
    file=open(filepath)
    t=file.read()
    blobed = TextBlob(t)
    #counts = Counter(tag for word,tag in blobed.tags)
    adj_list = []
    adv_list = []
    adj_tag_list = ['JJ', 'JJR','JJS']
    adv_tag_list = ['RB', 'RBR','RBS']
    for (a, b) in blobed.tags:
        if b in adj_tag_list:
            expected_str = Word(a)
            expected_str = expected_str.lemmatize('a')
            adj_list.append(expected_str)
        elif b in adv_tag_list:
            expected_str = Word(a)
            expected_str = expected_str.lemmatize('r')
            adv_list.append(expected_str)
        else:
            pass

    with open(outfilepath, "w") as txt_file:   
        for line in adj_list:
            txt_file.write(line + " ")
        for line in adv_list:
            txt_file.write(line + " ")
    # return adj_list, adv_list, counts['JJ']+counts['JJR']+counts['JJS'], counts['RB']+counts['RBR']+counts['RBS']

    count_from_text_file(outfilepath, countfilepath, minpos)

def count_verbs(filepath, verbfilepath, countfilepath, minpos):
    file=open(filepath)
    t=file.read()
    blobed = TextBlob(t)
    verb_list = []
    verb_tag_list = ['VB', 'VBD', 'VBG', 'VBN', 'VBP','VBZ']
    for (a, b) in blobed.tags:
        if b in verb_tag_list:
            expected_str = Word(a)
            expected_str = expected_str.lemmatize('v')
            verb_list.append(expected_str)
        else:
            pass
    
    with open(verbfilepath, "w") as txt_file:
        for line in verb_list:
            txt_file.write(line + " ")

    count_from_text_file(verbfilepath, countfilepath, minpos)

count_verbs('data/voxArticles.txt', 'data/voxVerbs.txt', 'data/verb_count_vox.csv', 20)
