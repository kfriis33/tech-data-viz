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
from statsmodels.stats.multicomp import (pairwise_tukeyhsd,
                                         MultiComparison)


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

    df = pd.DataFrame(sent, columns = ['polarity','subjectivity'])
    include =['object', 'float', 'int'] 
    desc = df.describe(include = include)
    print(desc)
    print(df.mean(axis=0))
    print(df.mean(axis=0)[0])
    # print(df.describe().mean)
    # print(desc.mean(axis=0))
    #arr = np.array(sent)
    #print(df.min(axis=0)[0])
    #print(np.argwhere(np.isclose(arr, df.min(axis=0), 0.1)))
    #print(np.argmin(arr[1:200], axis=0))

    #print(sent)

def sent_ttest(filepath1, filelist):
    sent = []

    file1 = open(filepath1, 'r')
    lines = csv.reader(file1)

    for l in lines:
        sentence = l[0] + l[1]
        blob = TextBlob(sentence)
        sent.append(('news', blob.sentiment.polarity))

    df = pd.DataFrame(sent, columns = ['group','polarity'])
    include =['object', 'float', 'int'] 
    #print(filepath1)
    #print(df.describe(include = include))

    sent2 = []
    sent3 = []
    sent4 = []
    sentarray = [sent2, sent3, sent4]
    group = ['academia', 'companies', 'defense']
    counter = 0

    for item in filelist:
        readfile = open(item, 'r')
        rows = csv.reader(readfile)

        for row in rows:
            sentence = row[0]
            blob = TextBlob(sentence)
            sentarray[counter].append((group[counter], blob.sentiment.polarity))

        counter+=1


    df2 = pd.DataFrame(sent2, columns = ['group','polarity'])
    #print(filelist[0])
    #print(df2.describe(include = include))

    df3 = pd.DataFrame(sent3, columns = ['group','polarity'])
    #print(filelist[1])
    #print(df3.describe(include = include))

    df4 = pd.DataFrame(sent4, columns = ['group','polarity'])
    #print(filelist[2])
    #print(df4.describe(include = include))

    # run anova test for difference of group of means
    print(scipy.stats.f_oneway(sent, sent2, sent3, sent4))

    frames = [df, df2, df3, df4]
    stacked = pd.concat(frames)

    MultiComp = pairwise_tukeyhsd(endog=stacked['polarity'],
                            groups=stacked['group'], alpha=0.001)

    print(MultiComp)

sent_ttest( 'src/data/news.csv', ['src/data/academia.csv', 'src/data/companies.csv', 'src/data/defense.csv'])
#sentiment('src/data/scraping_data/ycombo.csv', 0)
#sentiment('src/data/scraping_data/intercept-data.csv', 6)
#sentiment('src/data/scraping_data/vox-data.csv', 7)
#sentiment('src/data/scraping_data/brown_cs.csv', 0)
#sentiment('src/data/scraping_data/dep_def.csv', 0)
#sentiment('src/data/scraping_data/cv_papers.csv', 2)
#sentiment('src/data/scraping_data/ml_papers.csv', 1)
#sentiment('src/data/scraping_data/crypto_papers.csv', 1)
# sentiment('src/data/scraping_data/angel_all.csv', 0)