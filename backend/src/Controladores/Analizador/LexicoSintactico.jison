%{
   const Tipo_Variable          = require('./Simbolo/Tipo')
   const Nativo                 = require('./Expresiones/Nativo')
   const Aritmetica             = require('./Expresiones/Aritmetica')
   const AccesoVariable         = require('./Expresiones/AccesoVariable')
   const Declaracion            = require('./Instrucciones/Declaracion')
   const Asignacion             = require('./Instrucciones/Asignacion')
   const Cout                   = require('./Instrucciones/Cout')
   const CoutEndl               = require('./Instrucciones/CoutEndl')
   const FuncionToLower         = require('./Expresiones/FuncionToLower')
   const FuncionToUpper         = require('./Expresiones/FuncionToUpper')
   const FuncionRound           = require('./Expresiones/FuncionRound')
   const FuncionToString        = require('./Expresiones/FuncionToString')
%}


%lex


%options case-insensitive

%%
\s+                                 {}
"//".*                              {}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}


"int"                       return 'INT'
"double"                    return 'DOUBLE'
"char"                      return 'CHAR'
"bool"                      return 'BOOL'
"true"                      return 'TRUE'
"false"                     return 'FALSE'
"std::string"               return 'STRING'
"cout"                      return 'COUT'
"endl"                      return 'ENDL'
"pow"                       return 'POW'
"tolower"                   return 'TO_LOWER'
"toupper"                   return 'TO_UPPER'
"round"                     return 'ROUND'
"std::toString"             return 'TOSTRING'

"["                         return 'CORCHETE_IZQUIERDP'
"]"                         return 'CORCHETE_DERECHO'
"="                         return 'IGUAL'
"("                         return 'PARENTESIS_IZQUIERDO'
")"                         return 'PARENTESIS_DERECHO'
"{"                         return 'LLAVE_DERECHA'
"}"                         return 'LLAVE_IZQUIERDA'
";"                         return 'PUNTOYCOMA'
"?"                         return 'INTERROGACION'
"!"                         return 'EXCLAMACION'
":"                         return 'DOSPUNTOS'
","                         return 'COMA'

"+"                         return 'MAS'
"-"                         return 'MENOS'
"*"                         return 'MULTICACION'
"/"                         return 'DIVISION'
"%"                         return 'MODULO'

"=="                        return 'IGUAL_IGUAL'
"!="                        return 'DISTINTO'
"<"                         return 'MENOR_QUE'
">"                         return 'MAYOR_QUE'
"<="                        return 'MENOR_IGUAL'
"=>"                        return 'MAYOR_IGUAL'

"||"                        return 'OR'
"&&"                        return 'AND'

[a-z][a-z0-9_]*                                                                 return 'ID'
[0-9]+"."[0-9]+                                                                 return 'DECIMAL'
[0-9]+                                                                          return 'ENTERO'
(\"(\\.|[^\\"])*\") {yytext=yytext.substr(1, yyleng-2); return 'CADENA';}
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['] {yytext=yytext.substr(1, yyleng-2); return 'CARACTER'}

[\ \r\t\f\t]+               {}
[\ \n]                      {}

<<EOF>>                     return 'EOF'


%{

%}

/lex

// precedencias
%left 'MAS', 'MENOS'
%right 'UMENOS'
%left 'MULTICACION', 'DIVISION', 'MODULO'
%right 'POW'


%start inicio
%%


inicio : instrucciones EOF 
{
    return $1;
};

instrucciones : instrucciones instruccion   
{
    $1.push($2); 
    $$=$1;
}
              | instruccion
{
    $$=[$1];
};

instruccion : declaracion 
{
    $$=$1;
}
            | asignacion
{
    $$=$1;
}
            | counts
{
    $$=$1;
};

declaracion : tipo_dato identificador IGUAL expresion PUNTOYCOMA
{
    $$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $4);
} 
            | tipo_dato identificador PUNTOYCOMA                      
{
    $$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, null);
};

identificador : identificador COMA ID
{
    $$=$1.push($3);
    $$=$1;
}
            | ID
{
    $$=[$1];
};

asignacion : ID IGUAL expresion PUNTOYCOMA
{
    $$ = new Asignacion.default($1, $3, @1.first_line, @1.first_column);
};

counts : COUT MENOR_QUE MENOR_QUE expresion PUNTOYCOMA
{
    $$= new Cout.default($4, @1.first_line, @1.first_column);
}
        | COUT MENOR_QUE MENOR_QUE expresion MENOR_QUE MENOR_QUE ENDL PUNTOYCOMA
{
    $$= new CoutEndl.default($4, @1.first_line, @1.first_column);
};


expresion : ENTERO 
{
    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.ENTERO), $1, @1.first_line, @1.first_column);
}
            | DECIMAL
{
    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.DECIMAL), $1, @1.first_line, @1.first_column);
}
            | CARACTER
{
    var text = $1.substr(0,$1.length);
    text = text.replace(/\\n/g, "\n");
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/\\\"/g,"\"");
    text = text.replace(/\\r/g, "\r");
    text = text.replace(/\\t/g, "\t");
    text = text.replace(/\\\'/g, "'");

    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.CARACTER), text, @1.first_line, @1.first_column);
}
            | CADENA                           
{
    var text = $1.substr(0,$1.length);
    text = text.replace(/\\n/g, "\n");
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/\\\"/g,"\"");
    text = text.replace(/\\r/g, "\r");
    text = text.replace(/\\t/g, "\t");
    text = text.replace(/\\\'/g, "'");

    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.CADENA), text, @1.first_line, @1.first_column);
}
            | TRUE
{
    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column); 
}
            | FALSE
{ 
    $$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column); 
}
            | ID
{
    $$ = new AccesoVariable.default($1, @1.first_line, @1.first_column);
} 
            | expresion MAS expresion
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3);
}
            | expresion MENOS expresion 
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.MENOS, @1.first_line, @1.first_column, $1, $3);
}
            | expresion MULTICACION expresion 
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.MULTICACION, @1.first_line, @1.first_column, $1, $3);
}
            | expresion DIVISION expresion 
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.DIVISION, @1.first_line, @1.first_column, $1, $3);
}
            | expresion MODULO expresion 
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.MODULO, @1.first_line, @1.first_column, $1, $3);
}
            | POW PARENTESIS_IZQUIERDO expresion COMA expresion PARENTESIS_DERECHO 
{ 
    $$ = new Aritmetica.default(Aritmetica.Operadores.POTENCIA, @1.first_line, @1.first_column, $3, $5); 
}
            | MENOS expresion %prec UMENOS 
{
    $$ = new Aritmetica.default(Aritmetica.Operadores.NEGACION, @1.first_line, @1.first_column, $2);
}
            | TO_LOWER PARENTESIS_IZQUIERDO expresion PARENTESIS_DERECHO
{
    $$ = new FuncionToLower.default(FuncionToLower.Funcion.TOLOWER, @1.first_line, @1.first_column, $3);
}
            | TO_UPPER PARENTESIS_IZQUIERDO expresion PARENTESIS_DERECHO
{
    $$ = new FuncionToUpper.default(FuncionToUpper.Funcion.TOUPPER, @1.first_line, @1.first_column, $3);
}
            | ROUND PARENTESIS_IZQUIERDO expresion PARENTESIS_DERECHO
{
    $$ = new FuncionRound.default(FuncionRound.Funcion.ROUND, @1.first_line, @1.first_column, $3);
}
            | TOSTRING PARENTESIS_IZQUIERDO expresion PARENTESIS_DERECHO
{
    $$ = new FuncionToString.default(FuncionToString.Funcion.TOSTRING, @1.first_line, @1.first_column, $3);
};

tipo_dato : INT
{
    $$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.ENTERO);
}
        | DOUBLE
{
    $$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.DECIMAL);
}
        | CHAR
{
    $$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.CARACTER);
}
        | BOOL
{
    $$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO);
}
        | STRING
{
    $$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.CADENA);
    
};