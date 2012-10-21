#!/usr/bin/env python
# -*- coding: utf-8 -*-

import settings
import requests
import json
import os

def getImageList( word, key, skip=0, images=[] ):
    
    print "画像数:", len(images)
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
            images.append( result['MediaUrl'] )

    if results['d'].has_key( '__next' ):
        return getImageList( word, key, skip=skip+50, images=images)
    else:
        return images

def saveImages( urls, dir ):
    for url in urls:
        try:
            img = requests.get( url )
            f = open( os.path.join( dir, os.path.basename( url ) ), 'wb' )
            f.write( img.read() )
            img.close()
            f.close()
        except:
            pass

if __name__ == '__main__':
    word = settings.word
    key = settings.key
    dir = os.path.join( 'static', 'img' )

    urls = getJson( word, key )
    downloadImages( urls, dir )
