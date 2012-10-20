opencv_createsamples -info info.dat -vec a.vec -bg bg.txt
opencv_haartraining -data haarcascade -vec a.vec -bg negative.dat -nstages 20
