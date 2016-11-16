var gulp = require('gulp'); //pobierz modul gulp - mamy juz
var sass = require('gulp-sass'); //pobierz kolejne moduly - gulp-sass, to modul do kompilacji sassa
var sourcemaps = require('gulp-sourcemaps'); //jw. te trzy linijki to dodawanie modulow

gulp.task('scss', function(){ //gulp.task okresla nam taski - to mozemy potem wywolywac, tu jest task "scss", i dalej wykonuje sie funkcja.
    return gulp.src("sass/*.scss") //zwraca sciezke do pliku main.scss
        .pipe(sourcemaps.init()) //wywolujemy funkcje pipe a w nim modul sourcemaps.init
        .pipe(sass({ //tu modul sass, a w nim kolejna funkcja
         errLogToConsole: true, //tutaj - wyswietlanie bledow z scss w konsoli (ze sciezka pliku)
         outputStyle: 'extended',  //sposob wyswietlania css - expanded to czytelne rozszerzone, inne to w jednej linijce (compressed)
         // sourceComments: true,
       }).on('error', sass.logError)) //naslychiwanie na konsoli
        .pipe(sourcemaps.write()) // znowu pipe z parametrem sourcemaps.write() - to zapisuje do pliku
        .pipe(gulp.dest("css")) //tu tworyz nam sie folder css z plikiem css
})

gulp.task('default', ['scss'], function() {  //tutaj kolejny task, default, wiec wystarczy wpisac gulp
    gulp.watch('sass/**/*.scss', ['scss']); //wlaczamy mu nasluchiwanie  na wszystkich plikach

});
