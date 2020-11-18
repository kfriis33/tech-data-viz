import collections
import re



TEXT_PATH = './data/test.txt'
NUM_WORDS=None
MIN_WORDS = 2

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


    if NUM_WORDS ==None:
        to_print=len(wordcount.items())
    else:
        to_print = NUM_WORDS


    # the next line sorts the default dict on the values in decreasing  # order and prints the first "to_print".
    mc = sorted(wordcount.items(), key=lambda k_v: k_v[1], reverse=True)[:to_print] # this is continued from the previous assignment

    # Cut off dictionary values that do not meet the MIN_WORDS threshold
    final_dict = {}
    for word, count in mc:
        final_dict[word] = count
        if count < MIN_WORDS:
            break
    
    # Group words together based on similar counts
    counter = 0
    total = len(final_dict.keys())
    interval = total//5
    group_counter =0
    with open('./data/word_counts.csv', 'w') as f:
        f.write("%s,%s,%s\n"%('word', 'group','count'))
        for word, count in final_dict.items():
            if counter % interval == 0:
                group_counter+=1
            if word: # Weird bug where None key being stored
                f.write("%s,%s,%s\n"%(word,group_counter,count))
            counter+=1
            


count_from_text_file(TEXT_PATH)