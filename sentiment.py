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
    print(df.mean(axis=0))
    # print(df.describe().mean)
    # print(desc.mean(axis=0))
    # arr = np.array(sent)
    # print(np.argwhere(np.isclose(arr, 0.8000, 0.1)))
    # print(array[20])
    # print(array[42])
    # print(array[69])
    # print(array[91])
    # print(array[104])
    # print(array[284])
    # print(array[289])
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

#sentiment('data/scraping_data/defense2.csv', 0)
#sentiment('data/scraping_data/intercept-data.csv', 6)
#sentiment('data/scraping_data/vox-data.csv', 7)
#sentiment('data/scraping_data/brown_cs.csv', 0)
#sentiment('data/scraping_data/dep_def.csv', 0)
#sentiment('data/scraping_data/cv_papers.csv', 2)
#sentiment('data/scraping_data/ml_papers.csv', 1)
#sentiment('data/scraping_data/crypto_papers.csv', 1)
sentiment('data/scraping_data/angel_all.csv', 0)