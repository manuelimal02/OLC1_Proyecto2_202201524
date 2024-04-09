%{
const Arbol = require('./Simbolo/Arbol');
%}


%lex
%options case-insensitive 

%%

\s+                     {}
"//".*                  {}

"int"                   {return 'INT'}
"DOUBLE"                {return 'DOUBLE'}
"BOOL"                  {return 'BOOL'}
"CHAR"                  {return 'CHAR'}
"STD::STRING"           {return 'STRING'}

"="                     {return "IGUAL"}
","                     {return "COMA"}
";"                     {return "PUNTOCOMA"}

[0-9]+                  {return "ENTERO"}
[0-9]+"."[0-9]+         {return "DECIMAL"}
[a-zA-Z_][a-zA-Z0-9_]*  {return "ID"}


<<EOF>>                 {return "EOF"}

/lex

%start inicio

%%

inicio : instrucciones EOF
{
    $$ = new Arbol("RAIZ", "RAIZ", this.$.first_line, this.$.first_column);
    $$.AgregarHijo($1);
    return $$
};

instrucciones : instrucciones instruccion
{
    $1.AgregarHijo($2);
    $$=$1;
}
              | instruccion
{
    $$ = new Arbol("INSTRUCCION", "INSTRUCCION", this.$.first_line, this.$.first_column);
    $$.AgregarHijo($1);
};

instruccion : declaracion 
{
    $$=$1;
}
;

declaracion : tipo_dato lista_id PUNTOCOMA
{
    $$ = new Arbol("DECLARACION", "DECLARACION", this.$.first_line, this.$.first_column);
    $$.AgregarHijo($1);
    $$.AgregarHijo($2);
    $$.AgregarHijo($3);
};

lista_id : lista_id COMA ID
{
    $1.AgregarHijo(new Arbol("ID",$3, this.$.first_line, this.$.first_column));
    $$=$1;
}
            | ID
{
    $$ = new Arbol("LISTA_ID", "LISTA_ID");
    $$.AgregarHijo(new Arbol("ID",$1, this.$.first_line, this.$.first_column));
}       
;


tipo_dato   : INT
{
    $$=$1;
}            
            | DOUBLE
{
    $$=$1;
}  
            | BOOL  
{
    $$=$1;
}       
            | CHAR
{
    $$=$1;
}
            | STRING   
;
