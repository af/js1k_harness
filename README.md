# JS1K Development Harness

A collection of command-line tools for developing [JS1K](http://js1k.com/2013-spring/rules) entries.


## Installation

    npm install -g js1k-harness

or

    git clone git://github.com/af/js1k_harness.git
    cd js1k-harness
    npm link

## Usage

Run the `js1k` executable. It provides three main subcommands:

### js1k init <filename>

Creates a boilerplate js file that you can add your entry's code to.

### js1k serve <filename>

Starts a web server that serves your entry inside the js1k shim. This will
automatically minify your code for you (with uglify-js), and show the current
size of your entry in the browser. It reloads and minifies your javascript on
every request, so you don't need to restart the server when your code changes
(just refresh your browser).

### js1k build <filename>

Dumps your minified entry code to the console. You can submit this directly
to js1k, although you can probably still save a couple more bytes by editing
the output manually (removing `var`, etc).


## Full command list (js1k -h)

```
Usage: js1k [options] [command]

Commands:

  init                   Create a new js1k boilerplate javascript file
  serve                  Serve your minified js in the js1k shim (on port 3001)
  build                  Outputs a minified version of your javascript, suitable for submission
  rules                  Open the js1k rules page
  submit                 Open the js1k submission page

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## Tips

The byte savings you get from uglify-js can take you a long way, but beyond that there are a
lot of clever manual tricks to slim your entry down even further. These articles have some
great tips:

* http://marijnhaverbeke.nl/js1k/
* http://qfox.nl/notes/111
* http://benalman.com/news/2010/08/organ1k-js1k-contest-entry/
