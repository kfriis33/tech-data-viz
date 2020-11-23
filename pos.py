from textblob import TextBlob
from collections import Counter
import sys  
from importlib import reload
reload(sys)  
sys.getdefaultencoding() # use this for Python3
from textblob import TextBlob



def textblob_adj():
    url ='./data/defensestatements.txt'
    file=open(url)
    t=file.read()
    blobed = TextBlob(t)
    #counts = Counter(tag for word,tag in blobed.tags)
    adj_list = []
    adv_list = []
    adj_tag_list = ['JJ', 'JJR','JJS']
    adv_tag_list = ['RB', 'RBR','RBS']
    for (a, b) in blobed.tags:
        if b in adj_tag_list:
           adj_list.append(a)
        elif b in adv_tag_list:
           adv_list.append(a)
        else:
            pass

    with open("defensePOS.txt", "w") as txt_file:   
        for line in adj_list:
            txt_file.write(line + " ")
        for line in adv_list:
            txt_file.write(line + " ")
    # return adj_list, adv_list, counts['JJ']+counts['JJR']+counts['JJS'], counts['RB']+counts['RBR']+counts['RBS']

textblob_adj()