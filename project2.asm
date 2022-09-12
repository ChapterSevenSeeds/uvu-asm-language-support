H	        .BYT 'H'
e	        .BYT 'e'
l	        .BYT 'l'
o	        .BYT 'o'

T	        .BYT 'T'
y	        .BYT 'y'
s	        .BYT 's'
o	        .BYT 'o'
n	        .BYT 'n'

I	        .BYT 'I'
c	        .BYT 'c'
a	        .BYT 'a'
p	        .BYT 'p'
r	        .BYT 'r'
i	        .BYT 'i'
t	        .BYT 't'
semi	    .BYT ';'
space	    .BYT ' '

char1	    .BYT '1'
charplus    .BYT '+'
char3       .BYT '3'

char2       .BYT '2'
charstar    .BYT '*'

char5       .BYT '5'
charminus   .BYT '-'

chardivide  .BYT '/'
charequals  .BYT '='
newline     .BYT '\n'

G           .BYT 'G'
d           .BYT 'd'
b           .BYT 'b'
y           .BYT 'y'

one         .INT #1
two         .INT 0x02
three       .INT #3
five        .INT 0x05

MAIN        LDB r3, H       ; Line 1
            TRP #3
            LDB r3, e
            TRP #3
            LDB r3, l
            TRP #3
            TRP #3
            LDB r3, o
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, T
            TRP #3
            LDB r3, y
            TRP #3
            LDB r3, s
            TRP #3
            LDB r3, o
            TRP #3
            LDB r3, n
            TRP #3
            LDB r3, newline
            TRP #3

            LDR r1, one     ; res = one + three
            LDR r2, three
            ADD r1, r2

            LDB r3, char1   ; cout << D
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charplus
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, char3
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charequals
            TRP #3

            MOV r3, r1      ; << res
            TRP #1

            LDB r3, newline ; << endl;
            TRP #3

            LDR r1, two     ; res = two * three
            LDR r2, three
            MUL r1, r2

            LDB r3, char2   ; cout << E
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charstar
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, char3
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charequals
            TRP #3

            MOV r3, r1      ; << res
            TRP #1

            LDB r3, newline ; << endl;
            TRP #3

            LDR r1, one     ; res = one - five
            LDR r2, five
            SUB r1, r2

            LDB r3, char1   ; cout << F
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charminus
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, char5
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charequals
            TRP #3

            MOV r3, r1      ; << res
            TRP #1

            LDB r3, newline ; << endl;
            TRP #3

            LDR r1, five     ; res = five / two
            LDR r2, two
            DIV r1, r2

            LDB r3, char5   ; cout << G
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, chardivide
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, char2
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, charequals
            TRP #3

            MOV r3, r1      ; << res
            TRP #1

            LDB r3, newline ; << endl;
            TRP #3

            LDB r3, I       ; cout << C << endl;
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, c
            TRP #3
            LDB r3, a
            TRP #3
            LDB r3, n
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, p
            TRP #3
            LDB r3, r
            TRP #3
            LDB r3, i
            TRP #3
            LDB r3, n
            TRP #3
            LDB r3, t
            TRP #3
            LDB r3, space
            TRP #3
            LDB r3, semi
            TRP #3
            LDB r3, newline
            TRP #3

            LDB r3, G       ; cout << H << endl;
            TRP #3
            LDB r3, o
            TRP #3
            TRP #3
            LDB r3, d
            TRP #3
            LDB r3, b
            TRP #3
            LDB r3, y
            TRP #3
            LDB r3, e
            TRP #3

            TRP #0