from textblob import Word
from collections import Counter
import sys  
from importlib import reload
reload(sys)  
sys.getdefaultencoding() # use this for Python3
from textblob import TextBlob
import csv
import pandas as pd
import scipy

def sentiment(filepath):
    sent = list()

    file =  open(filepath, 'r')
    rows = csv.reader(file)
    
    for row in rows:
        sentence = row[6]
        blob = TextBlob(sentence)
        #sent.append((blob.sentiment.polarity, blob.sentiment.subjectivity))
        sent.append(blob.sentiment.subjectivity)


    
    #print(sent)

    sent2 = []

    file2 = open('data/defense/defense2.csv', 'r')
    lines = csv.reader(file2)

    for l in lines:
        sentence = l[0]
        blob = TextBlob(sentence)
        sent2.append(blob.sentiment.subjectivity)

    # d = {'Intercept':sent,'Defense':sent2}
    # df = pd.DataFrame(d, columns = ['Intercept','Defense'])
    # include =['object', 'float', 'int'] 
    # desc = df.describe(include = include)
    # print(desc)

    print(scipy.stats.ttest_ind(sent, sent2, equal_var=False))


sentiment('data/intercept/intercept-data.csv')