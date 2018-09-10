set ruler
"set t_Co=256
"set spell
set tabstop=4
set softtabstop=4
set expandtab
set shiftwidth=4
"set ignorecase
set incsearch
set hlsearch
set showcmd
set showmatch
set bg=dark
"set backspace=4
"set number
"set relativenumber
set autoindent
set textwidth=90

autocmd FileType html set omnifunc=htmlcomplete#CompleteTags
if has("syntax")
  syntax on
endif

if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif

  filetype plugin indent on

  "au BufRead,BufNewFile *.tex\|*.txt\|*.md set spell
endif

imap jj  <ESC>
map fxin mzgg=G`z

nmap <Tab>m    :!make<CR>
map <F2> :r ~/projects/personal-tools/snippets/js/nf<ENTER>
