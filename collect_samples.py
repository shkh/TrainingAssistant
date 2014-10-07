#!/usr/bin/env python
# -*- coding: utf-8 -*-
u"""
Collects samples from bing
"""
import settings
import requests
import json
import os

def getUrls( word, key, skip=0, urls=[] ):
    
    print "Samples:", len(urls)
    prefix = 'https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Image'
    params = {
            'Query': "'%s'" % word , 
            'Adult': "'Off'", 
            '$format': 'json', 
            }
    
    if skip:
        params.update( { '$skip': str( skip ) } )

    results = requests.get( prefix, auth=( key, key ), params=params )
    results = results.json

    for result in results['d']['results']:
        typ = result[ 'ContentType' ]
        if typ== 'image/jpg' or typ == 'image/jpeg':
            urls.append( result['MediaUrl'] )

    if results['d'].has_key( '__next' ):
        return getUrls( word, key, skip=skip+50, urls=urls)
    else:
        return urls

def saveImages( urls, dir ):
    for url in urls:
        try:
            img = requests.get( url ).content
            f = open( os.path.join( dir, os.path.basename( url ) ), 'wb' )
            f.write( img )
            img.close()
            f.close()
        except:
            pass

if __name__ == '__main__':
    word = settings.word
    key = settings.key
    dir = os.path.join( 'static', 'img' )

    urls = getUrls( word, key )
    saveImages( urls, dir )

