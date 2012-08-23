[![build status](https://secure.travis-ci.org/AndrewKeig/dust-down.png)](http://travis-ci.org/AndrewKeig/dust-down)
# dust-down - compiling dust.js templates

dust-down is a node.js command line tool which will compile all dust.js templates in a given directory; and write each to a javascript file; ready to be used for client side templating. 

we are currently supporting the following features:

- versioning
- nested folder structures


# Install

    $ npm install dust-down


## Usage

    Usage: dust-down [path] [version_number]


# Example 1; with path; default version number


given the following folder structure

    /path_to_templates/
        template_one.html
        template_two.html
            /path_to_more_templates/
                    template_three.html

when we execute the compiler with a single path argument

    node dust-down /path_to_templates/

then dust-down will compile templates to

    /path_to_templates/compiled_0_0_1
        template_one_0_0_1.js
            template_two_0_0_1.js
                /path_to_more_templates/
                        template_three_0_0_1.js



# Example 2; with path and version number


given the following folder structure

    /path_to_templates/
        template_one.html
        template_two.html
            /path_to_more_templates/
                    template_three.html

when we execute the compiler with a path and version argument

    node dust-down /path_to_templates/ 0_0_5


then dust-down will compile templates to

    /path_to_templates/compiled_0_0_5
        template_one_0_0_5.js
            template_two_0_0_5.js
                /path_to_more_templates/
                        template_three_0_0_5.js