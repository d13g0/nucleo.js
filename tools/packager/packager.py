#!/usr/bin/python
# -*- coding: utf-8 -*-
import argparse, subprocess
from os import walk
from os.path import join as pjoin
from os.path import split as psplit
from os.path import sep as pathsep
    
    
class terminal:

   DARKPURLE    = '\033[35m'    
   DARKCYAN     = '\033[36m'
   
   RED          = '\033[91m'  #1
   GREEN        = '\033[92m'  #2
   YELLOW       = '\033[93m'  #3
   BLUE         = '\033[94m'  #4  
   PURPLE       = '\033[95m'  #5
   CYAN         = '\033[96m'  #6
   
   BOLD         = '\033[1m'
   UNDERLINE    = '\033[4m'
   END          = '\033[0m'

TERM_R         =  terminal.RED   
TERM_CU         = terminal.UNDERLINE + terminal.CYAN
TERM_E          = terminal.END

EOL = '\n'


def get_elements(include_file):
    with open(include_file) as f:
        elements = [line.strip() for line in f]
    return elements
    
def get_licence(licence_file, version):    
    with open(licence_file,'r') as f:
        licence = f.read()    
    
    licence = licence%(version)
    return licence

def packager():

    
    parser = argparse.ArgumentParser(description='Nucleo Packager')
    
    parser.add_argument('-version', dest='version', help='Version', type=str, required=True)
    parser.add_argument('-licence', dest='licence', help='Licence file', required=True)
    parser.add_argument('-source',  dest='source',  help='Source directory', required=True )    
    parser.add_argument('-include', dest='include', help='File containing files to include in current built', required=True)
    parser.add_argument('-odir',    dest='odir',   help='Output directory', required=True )
    parser.add_argument('-minify',  dest='minify',  help='If this option is added, the resulting built will be minified', action='store_true', required= False)
    
    
    args = parser.parse_args()
    
    #1. updates the licence file
    licence = get_licence(args.licence, args.version)
    
      
    
    print
    print 'Packaging Nucleo.js  version %s'%(TERM_CU +  args.version +TERM_E)
    print
    
    #2. Get include list
    elements = get_elements(args.include)
    


    #3. Look and read files
    print 'Reading source files ...',
    source_files = [pjoin(root,name)
                 for root, dirs, files in walk(args.source)
                 for name in files
                 if name.endswith(".js")]
    hashmap = {}
    for vfile in source_files: 
        folder, name =  psplit(vfile)
        name = str.replace(name,'.js','')
        #folder = str.replace(folder,'\\','//')
        if name in elements:
            f = open(vfile,'r')
            hashmap[name]= f.read()
            f.close()
    
    print 'DONE'
    
    #4. initializes buffer with licence    
    library_file = licence
    library_file += EOL

    
    #5. Check that all the elements have been found    
    for item in elements:
        if item not in hashmap:
            print TERM_R + 'ERROR' + TERM_E
            print TERM_R + 'There is not file associated to item '+item+'. Please check.' + TERM_E
            return
        library_file += hashmap[item]
    
    library_file += EOL

    #6. Write library
    output = args.odir +pathsep + 'nucleo.js'
    output_min = args.odir + pathsep + 'nucleo.min.js'
        
    
    nucleo_lib = open(output,'w');
    nucleo_lib.write(library_file);
    nucleo_lib.close();    
    
    print
    print 'Nucleo.js %s is now available at %s'%(TERM_CU + args.version + TERM_E, TERM_CU + output + TERM_E)    
    
    if args.minify:
        print '      minifying ...'
        subprocess.call(['java','-jar','yui.jar','--type', 'js', '--line-break', '500', output, '-o',output_min])
        vox_min = open(output_min,'r')
        contents = vox_min.read()
        vox_min.close()
        vox_min = open(output_min,'w')
        contents = licence + contents
        vox_min.write(contents)
        vox_min.close()
        
        print 'MINIFIED Nucleo.js %s is now available at %s'%(TERM_CU + args.version + TERM_E,TERM_CU + output_min + TERM_E)
    print
    print ' -- END --'
    
if __name__ == '__main__':
    
    packager()
    
