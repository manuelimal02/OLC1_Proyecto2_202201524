/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var LexicoSintactico = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,10],$V2=[1,12],$V3=[1,13],$V4=[1,14],$V5=[1,15],$V6=[1,16],$V7=[1,11],$V8=[5,17,18,44,45,46,47,48,51,52],$V9=[13,15,16],$Va=[1,34],$Vb=[1,28],$Vc=[1,29],$Vd=[1,30],$Ve=[1,31],$Vf=[1,32],$Vg=[1,33],$Vh=[1,35],$Vi=[1,37],$Vj=[1,36],$Vk=[1,38],$Vl=[1,39],$Vm=[1,40],$Vn=[1,41],$Vo=[1,52],$Vp=[1,47],$Vq=[1,48],$Vr=[1,49],$Vs=[1,50],$Vt=[1,51],$Vu=[1,53],$Vv=[1,54],$Vw=[1,55],$Vx=[1,56],$Vy=[1,57],$Vz=[15,16,19,28,29,30,31,32,33,39,40,41,42,43],$VA=[1,88],$VB=[15,16,19,28,29,30,39,40,41,42,43],$VC=[15,16,19,28,39,40,41,42,43],$VD=[5,17,18,44,45,46,47,48,51,52,53];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"instrucciones":4,"EOF":5,"instruccion":6,"declaracion":7,"asignacion":8,"counts":9,"sentencia_if":10,"tipo_dato":11,"identificador":12,"IGUAL":13,"expresion":14,"PUNTOYCOMA":15,"COMA":16,"ID":17,"COUT":18,"MENOR_QUE":19,"ENDL":20,"ENTERO":21,"DECIMAL":22,"CARACTER":23,"CADENA":24,"TRUE":25,"FALSE":26,"PARENTESIS_IZQUIERDO":27,"PARENTESIS_DERECHO":28,"MAS":29,"MENOS":30,"MULTICACION":31,"DIVISION":32,"MODULO":33,"POW":34,"TO_LOWER":35,"TO_UPPER":36,"ROUND":37,"TOSTRING":38,"MAYOR_QUE":39,"MENOR_IGUAL":40,"IGUAL_IGUAL":41,"DISTINTO":42,"MAYOR_IGUAL":43,"INT":44,"DOUBLE":45,"CHAR":46,"BOOL":47,"STRING":48,"bloque":49,"LLAVE_DERECHA":50,"LLAVE_IZQUIERDA":51,"IF":52,"ELSE":53,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",13:"IGUAL",15:"PUNTOYCOMA",16:"COMA",17:"ID",18:"COUT",19:"MENOR_QUE",20:"ENDL",21:"ENTERO",22:"DECIMAL",23:"CARACTER",24:"CADENA",25:"TRUE",26:"FALSE",27:"PARENTESIS_IZQUIERDO",28:"PARENTESIS_DERECHO",29:"MAS",30:"MENOS",31:"MULTICACION",32:"DIVISION",33:"MODULO",34:"POW",35:"TO_LOWER",36:"TO_UPPER",37:"ROUND",38:"TOSTRING",39:"MAYOR_QUE",40:"MENOR_IGUAL",41:"IGUAL_IGUAL",42:"DISTINTO",43:"MAYOR_IGUAL",44:"INT",45:"DOUBLE",46:"CHAR",47:"BOOL",48:"STRING",50:"LLAVE_DERECHA",51:"LLAVE_IZQUIERDA",52:"IF",53:"ELSE"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,5],[7,3],[12,3],[12,1],[8,4],[9,5],[9,8],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,6],[14,2],[14,4],[14,4],[14,4],[14,4],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[11,1],[11,1],[11,1],[11,1],[11,1],[49,3],[49,2],[10,5],[10,7],[10,7]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

    return $$[$0-1];

break;
case 2:

    $$[$0-1].push($$[$0]); 
    this.$=$$[$0-1];

break;
case 3: case 11:

    this.$=[$$[$0]];

break;
case 4: case 5: case 6: case 7:

    this.$=$$[$0];

break;
case 8:

    this.$ = new Declaracion.default($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column, $$[$0-3], $$[$0-1]);

break;
case 9:

    this.$ = new Declaracion.default($$[$0-2], _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1], null);

break;
case 10:

    this.$=$$[$0-2].push($$[$0]);
    this.$=$$[$0-2];

break;
case 12:

    this.$ = new Asignacion.default($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);

break;
case 13:

    this.$= new Cout.default($$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column);

break;
case 14:

    this.$= new CoutEndl.default($$[$0-4], _$[$0-7].first_line, _$[$0-7].first_column);

break;
case 15:

    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.ENTERO), $$[$0], _$[$0].first_line, _$[$0].first_column);

break;
case 16:

    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.DECIMAL), $$[$0], _$[$0].first_line, _$[$0].first_column);

break;
case 17:

    var text = $$[$0].substr(0,$$[$0].length);
    text = text.replace(/\\n/g, "\n");
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/\\\"/g,"\"");
    text = text.replace(/\\r/g, "\r");
    text = text.replace(/\\t/g, "\t");
    text = text.replace(/\\\'/g, "'");

    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.CARACTER), text, _$[$0].first_line, _$[$0].first_column);

break;
case 18:

    var text = $$[$0].substr(0,$$[$0].length);
    text = text.replace(/\\n/g, "\n");
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/\\\"/g,"\"");
    text = text.replace(/\\r/g, "\r");
    text = text.replace(/\\t/g, "\t");
    text = text.replace(/\\\'/g, "'");

    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.CADENA), text, _$[$0].first_line, _$[$0].first_column);

break;
case 19:

    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO), true, _$[$0].first_line, _$[$0].first_column); 

break;
case 20:
 
    this.$ = new Nativo.default(new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO), false, _$[$0].first_line, _$[$0].first_column); 

break;
case 21:

    this.$ = new AccesoVariable.default($$[$0], _$[$0].first_line, _$[$0].first_column);

break;
case 22:

    this.$ = $$[$0-1];

break;
case 23:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.SUMA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);

break;
case 24:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.RESTA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);

break;
case 25:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.MULTICACION, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);

break;
case 26:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);

break;
case 27:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.MODULO, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);

break;
case 28:
 
    this.$ = new Aritmetica.default(Aritmetica.Operadores.POTENCIA, _$[$0-5].first_line, _$[$0-5].first_column, $$[$0-3], $$[$0-1]); 

break;
case 29:

    this.$ = new Aritmetica.default(Aritmetica.Operadores.NEGACION, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0]);

break;
case 30:

    this.$ = new FuncionToLower.default(FuncionToLower.Funcion.TOLOWER, _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-1]);

break;
case 31:

    this.$ = new FuncionToUpper.default(FuncionToUpper.Funcion.TOUPPER, _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-1]);

break;
case 32:

    this.$ = new FuncionRound.default(FuncionRound.Funcion.ROUND, _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-1]);

break;
case 33:

    this.$ = new FuncionToString.default(FuncionToString.Funcion.TOSTRING, _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-1]);

break;
case 34:

    this.$ = new Relacional.default(Relacional.Operador.MENORQUE, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 35:
 
    this.$ = new Relacional.default(Relacional.Operador.MAYORQUE, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 36:
 
    this.$ = new Relacional.default(Relacional.Operador.MENORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 37:
 
    this.$ = new Relacional.default(Relacional.Operador.IGUALIGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 38:
 
    this.$ = new Relacional.default(Relacional.Operador.DISTINTO, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 39:
 
    this.$ = new Relacional.default(Relacional.Operador.MAYORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]); 

break;
case 40:

    this.$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.ENTERO);

break;
case 41:

    this.$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.DECIMAL);

break;
case 42:

    this.$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.CARACTER);

break;
case 43:

    this.$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.BOOLEANO);

break;
case 44:

    this.$ = new Tipo_Variable.default(Tipo_Variable.tipo_dato.CADENA);
    

break;
case 45:
 
    this.$ = new Bloque.default($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column );

break;
case 46:

    this.$ = new Bloque.default([], _$[$0-1].first_line, _$[$0-1].first_column );

break;
case 47:

    this.$ = new ControlIf.default($$[$0-2],$$[$0],null,_$[$0-4].first_line, _$[$0-4].first_column);

break;
case 48: case 49:

    this.$ = new ControlIf.default($$[$0-4],$$[$0-2],$$[$0],_$[$0-6].first_line, _$[$0-6].first_column);

break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,17:$V0,18:$V1,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,52:$V7},{1:[3]},{5:[1,17],6:18,7:4,8:5,9:6,10:7,11:8,17:$V0,18:$V1,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,52:$V7},o($V8,[2,3]),o($V8,[2,4]),o($V8,[2,5]),o($V8,[2,6]),o($V8,[2,7]),{12:19,17:[1,20]},{13:[1,21]},{19:[1,22]},{27:[1,23]},{17:[2,40]},{17:[2,41]},{17:[2,42]},{17:[2,43]},{17:[2,44]},{1:[2,1]},o($V8,[2,2]),{13:[1,24],15:[1,25],16:[1,26]},o($V9,[2,11]),{14:27,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{19:[1,42]},{14:43,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:44,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},o($V8,[2,9]),{17:[1,45]},{15:[1,46],19:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},o($Vz,[2,15]),o($Vz,[2,16]),o($Vz,[2,17]),o($Vz,[2,18]),o($Vz,[2,19]),o($Vz,[2,20]),o($Vz,[2,21]),{14:58,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{27:[1,59]},{14:60,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{27:[1,61]},{27:[1,62]},{27:[1,63]},{27:[1,64]},{14:65,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{19:$Vo,28:[1,66],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{15:[1,67],19:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},o($V9,[2,10]),o($V8,[2,12]),{14:68,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:69,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:70,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:71,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:72,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:73,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:74,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:75,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:76,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:77,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:78,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{19:$Vo,28:[1,79],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{14:80,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},o($Vz,[2,29]),{14:81,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:82,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:83,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{14:84,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},{15:[1,85],19:[1,86],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{49:87,50:$VA},o($V8,[2,8]),o($VB,[2,23],{31:$Vr,32:$Vs,33:$Vt}),o($VB,[2,24],{31:$Vr,32:$Vs,33:$Vt}),o($Vz,[2,25]),o($Vz,[2,26]),o($Vz,[2,27]),o($VC,[2,34],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($VC,[2,35],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($VC,[2,36],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($VC,[2,37],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($VC,[2,38],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($VC,[2,39],{29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt}),o($Vz,[2,22]),{16:[1,89],19:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{19:$Vo,28:[1,90],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{19:$Vo,28:[1,91],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{19:$Vo,28:[1,92],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{19:$Vo,28:[1,93],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},o($V8,[2,13]),{14:73,17:$Va,19:[1,94],21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},o($V8,[2,47],{53:[1,95]}),{4:96,6:3,7:4,8:5,9:6,10:7,11:8,17:$V0,18:$V1,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:[1,97],52:$V7},{14:98,17:$Va,21:$Vb,22:$Vc,23:$Vd,24:$Ve,25:$Vf,26:$Vg,27:$Vh,30:$Vi,34:$Vj,35:$Vk,36:$Vl,37:$Vm,38:$Vn},o($Vz,[2,30]),o($Vz,[2,31]),o($Vz,[2,32]),o($Vz,[2,33]),{20:[1,99]},{10:101,49:100,50:$VA,52:$V7},{6:18,7:4,8:5,9:6,10:7,11:8,17:$V0,18:$V1,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:[1,102],52:$V7},o($VD,[2,46]),{19:$Vo,28:[1,103],29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,39:$Vu,40:$Vv,41:$Vw,42:$Vx,43:$Vy},{15:[1,104]},o($V8,[2,48]),o($V8,[2,49]),o($VD,[2,45]),o($Vz,[2,28]),o($V8,[2,14])],
defaultActions: {12:[2,40],13:[2,41],14:[2,42],15:[2,43],16:[2,44],17:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

   const Tipo_Variable          = require('./Simbolo/Tipo')
   const Nativo                 = require('./Expresiones/Nativo')
   const Aritmetica             = require('./Expresiones/Aritmetica')
   const Relacional             = require('./Expresiones/Relacional')
   const AccesoVariable         = require('./Expresiones/AccesoVariable')
   const Declaracion            = require('./Instrucciones/Declaracion')
   const Asignacion             = require('./Instrucciones/Asignacion')
   const Cout                   = require('./Instrucciones/Cout')
   const CoutEndl               = require('./Instrucciones/CoutEndl')
   const ControlIf              = require('./Instrucciones/If')
   const Bloque                 = require('./Instrucciones/Bloque')
   const FuncionToLower         = require('./Expresiones/FuncionToLower')
   const FuncionToUpper         = require('./Expresiones/FuncionToUpper')
   const FuncionRound           = require('./Expresiones/FuncionRound')
   const FuncionToString        = require('./Expresiones/FuncionToString')
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:return 44
break;
case 4:return 45
break;
case 5:return 46
break;
case 6:return 47
break;
case 7:return 25
break;
case 8:return 26
break;
case 9:return 48
break;
case 10:return 18
break;
case 11:return 20
break;
case 12:return 34
break;
case 13:return 35
break;
case 14:return 36
break;
case 15:return 37
break;
case 16:return 38
break;
case 17:return 52
break;
case 18:return 53
break;
case 19:return 'CORCHETE_IZQUIERDP'
break;
case 20:return 'CORCHETE_DERECHO'
break;
case 21:return 27
break;
case 22:return 28
break;
case 23:return 50
break;
case 24:return 51
break;
case 25:return 15
break;
case 26:return 'INTERROGACION'
break;
case 27:return 'DOSPUNTOS'
break;
case 28:return 16
break;
case 29:return 29
break;
case 30:return 30
break;
case 31:return 31
break;
case 32:return 32
break;
case 33:return 33
break;
case 34:return 41
break;
case 35:return 13
break;
case 36:return 42
break;
case 37:return 40
break;
case 38:return 43
break;
case 39:return 19
break;
case 40:return 39
break;
case 41:return 'NOT'
break;
case 42:return 'OR'
break;
case 43:return 'AND'
break;
case 44:return 17
break;
case 45:return 22
break;
case 46:return 21
break;
case 47:yy_.yytext=yy_.yytext.substr(1, yy_.yyleng-2); return 24;
break;
case 48:yy_.yytext=yy_.yytext.substr(1, yy_.yyleng-2); return 23
break;
case 49:
break;
case 50:
break;
case 51:return 5
break;
case 52:


break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:char\b)/i,/^(?:bool\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:std::string\b)/i,/^(?:cout\b)/i,/^(?:endl\b)/i,/^(?:pow\b)/i,/^(?:tolower\b)/i,/^(?:toupper\b)/i,/^(?:round\b)/i,/^(?:std::toString\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:;)/i,/^(?:\?)/i,/^(?::)/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:==)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:[a-z][a-z0-9_]*)/i,/^(?:[0-9]+\.[0-9]+)/i,/^(?:[0-9]+)/i,/^(?:("(\\.|[^\\"])*"))/i,/^(?:[']\\\\[']|[']\\"[']|[']\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['])/i,/^(?:[\ \r\t\f\t]+)/i,/^(?:[\ \n])/i,/^(?:$)/i,/^(?:)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = LexicoSintactico;
exports.Parser = LexicoSintactico.Parser;
exports.parse = function () { return LexicoSintactico.parse.apply(LexicoSintactico, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}