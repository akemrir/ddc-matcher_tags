# ddc-matcher_tags

Tags matcher for ddc.vim, for tags-exec

This filter checks match for text split by RegExp.

## Required

### denops.vim

<https://github.com/vim-denops/denops.vim>

### ddc.vim

<https://github.com/Shougo/ddc.vim>

## Configuration

```vim
call ddc#custom#patch_global('sourceOptions', #{
      \ 'tags-exec': {
      \   'matchers': ['matcher_tags'],
      \   'splitByRegexp': '(?=[A-Z])|_',
      \   'splitUnionString': '.*',
      \ }
```
