# Installation
---
1. Clone to your computer: 

		% git clone git@github.com:<<github account>>/TrainingAssistant.git

2. Add Jcrop: 

		% cd TrainingAssistant
		% git submodule init
		% git submodule update
		% cd static/Jcrop
		% git checkout master

3. install python modules
		
		% pip install flask requests


# Usage
---
### You can use `TrainingAssistant/collect_samples.py` to collect samples

1. Get an account key of Azure API
	
	[https://datamarket.azure.com/dataset/5ba839f1-12ce-4cce-bf57-a49d98d29a44](https://datamarket.azure.com/dataset/5ba839f1-12ce-4cce-bf57-a49d98d29a44)
	
2. Set your key and search word to `TrainingAssistant/settings.py`
		
		# -*- coding: utf-8 -*-
		word = u'search word'
		key	= 'your key'
	
3. Run
	
		% python collect_samples.py

	Samples will be stored into `TrainingAssistant/static/img`
	
### Run server

	% python views.py

then visit `http://localhost:5000`

![見たな？](http://farm9.staticflickr.com/8328/8108235073_6905ebdf39_c.jpg)
	
After all samples will be processed, 
