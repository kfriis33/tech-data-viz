import collections
import re

TEXT_PATH = './data/test.txt'
NUM_WORDS=None

# Code modified from https://medium.com/@agrimabahl/elegant-python-code-reproduction-of-most-common-words-from-a-story-25f5e28e0f8c
def count_from_text_file(filepath):
    # Open the file in read mode 
    file = open(filepath, "r") 
    file = file.read()
    # https://algs4.cs.princeton.edu/35applications/stopwords.txt
    stopwords = set(line.strip() for line in open('./data/stopwords.txt'))
    stopwords = stopwords.union(set(['a', 'i', 'mr', 'ms', 'mrs', 'one', 'two', 'said', 'is', 'and']))
    wordcount = collections.defaultdict(int)

    # \W is regex for characters that are not alphanumerics.
    # all non-alphanumerics are replaced with a blank space using re.sub
    pattern = r"\W"
    for word in file.lower().split():
        word = re.sub(pattern, '', word)
        if word not in stopwords:
            wordcount[word] += 1
    # printing most common words
    if NUM_WORDS ==None:
        to_print=len(wordcount.items())
    else:
        to_print = NUM_WORDS
    print(f"The most common words are:")
    # the next line sorts the default dict on the values in decreasing  # order and prints the first "to_print".
    mc = sorted(wordcount.items(), key=lambda k_v: k_v[1], reverse=True)[:to_print] # this is continued from the previous assignment
    for word, count in mc:
        print(word, ":", count)


count_from_text_file(TEXT_PATH)