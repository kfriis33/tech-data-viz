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
import numpy as np


def index_2d(myList, v):
    for i, x in enumerate(myList):
        if v in x:
            return (i, x.index(v))

def proportion(filepath, row_num):
    sent = list()
    array = []

    file =  open(filepath, 'r')
    rows = csv.reader(file)
    
    # for row in rows:
    #     array.append(row)
    #     sentence = row[row_num]
    #     blob = TextBlob(sentence)
    #     sent.append(blob.sentiment.polarity)

    sentiment_scores_tb = [round(TextBlob(row[row_num]).sentiment.polarity, 3) for row in rows]
    sentiment_category_tb = ['positive' if score > 0 
                             else 'negative' if score < 0 
                                 else 'neutral' 
                                     for score in sentiment_scores_tb]
    pos=0
    neg=0
    neut=0
    for item in sentiment_category_tb:
        if item == 'positive':
            pos+=1
        elif item == 'negative':
            neg+=1
        elif item == 'neutral':
            neut+=1

    print(pos, neg, neut)

#proportion('src/data/scraping_data/dep_def.csv', 0)


def sentiment(filepath, row_num):
    sent = list()
    array = []

    file =  open(filepath, 'r')
    rows = csv.reader(file)
    
    for row in rows:
        array.append(row)
        sentence = row[row_num]
        blob = TextBlob(sentence)
        sent.append((blob.sentiment.polarity, blob.sentiment.subjectivity))
        #sent.append(blob.sentiment.subjectivity)

    df = pd.DataFrame(sent, columns = ['polarity','subjectivity'])
    include =['object', 'float', 'int'] 
    desc = df.describe(include = include)
    print(desc)
    #print(df.mean(axis=0))
    # print(df.describe().mean)
    # print(desc.mean(axis=0))
    #arr = np.array(sent)
    #print(df.min(axis=0)[0])
    #print(np.argwhere(np.isclose(arr, df.min(axis=0), 0.1)))
    #print(np.argmin(arr[1:200], axis=0))
    #print(arr[15], array[15][1])
    #print(arr[36], array[36][1])
    # print(array[69])
    # print(array[91])
    #print(array[104])
    # print(array[284])
    #print(array[289])
    # print(array[303])
    # print(array[314])

    
    #print(sent)

    # sent2 = []

    # file2 = open('data/defense/defense2.csv', 'r')
    # lines = csv.reader(file2)

    # for l in lines:
    #     sentence = l[0]
    #     blob = TextBlob(sentence)
    #     sent2.append(blob.sentiment.subjectivity)

    

    # print(scipy.stats.ttest_ind(sent, sent2, equal_var=False))

sentiment('src/data/scraping_data/ycombo.csv', 0)
#sentiment('src/data/scraping_data/intercept-data.csv', 6)
sentiment('src/data/scraping_data/vox-data.csv', 7)
#sentiment('src/data/scraping_data/brown_cs.csv', 0)
#sentiment('src/data/scraping_data/dep_def.csv', 0)
#sentiment('src/data/scraping_data/cv_papers.csv', 2)
#sentiment('src/data/scraping_data/ml_papers.csv', 1)
#sentiment('src/data/scraping_data/crypto_papers.csv', 1)
# sentiment('src/data/scraping_data/angel_all.csv', 0)