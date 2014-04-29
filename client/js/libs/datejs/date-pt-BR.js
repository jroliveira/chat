﻿Date.CultureInfo = { 
    /* Culture Name */ 
    name: "pt-BR", 
    englishName: "Portuguese (Brazil)", 
    nativeName: "Português (Brasil)", 

    /* Day Name Strings */ 
    dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], 
    abbreviatedDayNames: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"], 
    shortestDayNames: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"], 
    firstLetterDayNames: ["d", "s", "t", "q", "q", "s", "s"], 

    /* Month Name Strings */ 
    monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"], 
    abbreviatedMonthNames: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"], 

    /* AM/PM Designators */ 
    amDesignator: "", 
    pmDesignator: "", 

    firstDayOfWeek: 0, 
    twoDigitYearMax: 2029, 

    /** 
     * The dateElementOrder is based on the order of the 
     * format specifiers in the formatPatterns.DatePattern. 
     * 
     * Example: 
     <pre> 
     shortDatePattern    dateElementOrder 
     ------------------  ---------------- 
     "M/d/yyyy"          "mdy" 
     "dd/MM/yyyy"        "dmy" 
     "yyyy-MM-dd"        "ymd" 
     </pre> 
     * 
     * The correct dateElementOrder is required by the parser to 
     * determine the expected order of the date elements in the 
     * string being parsed. 
     */ 
    dateElementOrder: "dmy", 

    /* Standard date and time format patterns */ 
    formatPatterns: { 
        shortDate: "d/M/yyyy", 
        longDate: "dddd, d' de 'MMMM' de 'yyyy", 
        shortTime: "H:mm", 
        longTime: "H:mm:ss", 
        fullDateTime: "dddd, d' de 'MMMM' de 'yyyy H:mm:ss", 
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss", 
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ", 
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT", 
        monthDay: "dd' de 'MMMM", 
        yearMonth: "MMMM' de 'yyyy" 
    }, 

    /** 
     * NOTE: If a string format is not parsing correctly, but 
     * you would expect it parse, the problem likely lies below. 
     * 
     * The following regex patterns control most of the string matching 
     * within the parser. 
     * 
     * The Month name and Day name patterns were automatically generated 
     * and in general should be (mostly) correct. 
     * 
     * Beyond the month and day name patterns are natural language strings. 
     * Example: "next", "today", "months" 
     * 
     * These natural language string may NOT be correct for this culture. 
     * If they are not correct, please translate and edit this file 
     * providing the correct regular expression pattern. 
     * 
     * If you modify this file, please post your revised CultureInfo file 
     * to the Datejs Forum located at http://www.datejs.com/forums/. 
     * 
     * Please mark the subject of the post with [CultureInfo]. Example: 
     *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark) 
     * 
     * We will add the modified patterns to the master source files. 
     * 
     * As well, please review the list of "Future Strings" section below. 
     */ 
    regexPatterns: { 
        jan: /^jan(eiro)?/i, 
        feb: /^fev(ereiro)?/i, 
        mar: /^mar(ço)?/i, 
        apr: /^abr(il)?/i, 
        may: /^mai(o)?/i, 
        jun: /^jun(ho)?/i, 
        jul: /^jul(ho)?/i, 
        aug: /^ago(sto)?/i, 
        sep: /^set(embro)?/i, 
        oct: /^out(ubro)?/i, 
        nov: /^nov(embro)?/i, 
        dec: /^dez(embro)?/i, 

        sun: /^dom(ingo)?/i, 
        mon: /^seg(unda(-feira)?)?/i, 
        tue: /^ter(ça(-feira)?)?/i, 
        wed: /^qua(rta(-feira)?)?/i, 
        thu: /^qui(nta(-feira)?)?/i, 
        fri: /^sex(ta(-feira)?)?/i, 
        sat: /^s(á|a)b(ado)?/i, 

        future: /^pr(ó|o)xim(o|a)/i, 
        past: /^(ú|u)ltim(o|a)|anterior/i, 
        add: /^(\+|adicionar|mais)/i, 
        subtract: /^(\-|subtrair|menos)/i, 

        yesterday: /^ontem/i, 
        today: /^hoje/i, 
        tomorrow: /^amanh(ã|a)/i, 
        now: /^agora/i, 

        millisecond: /^ms|mili(segundo)?s?/i, 
        second: /^segundo(s)?/i, 
        minute: /^min(uto)?s?/i, 
                hour: /^h(ora)?s?/i, 
                week: /^sem(ana)?s?/i, 
        month: /^(m(ê|e)s|meses)/i, 
        day: /^dia(s)?/i, 
        year: /^ano(s)?/i, 

        shortMeridian: /^(a|p)/i, 
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i, 
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i, 
        ordinalSuffix: /^\s*(st|nd|rd|th)/i, 
        timeContext: /^\s*(\:|a(?!u|p)|p)/i 
    }, 

    timezones: { UTC: "-000", GMT: "-000", EST: "-0500", EDT: "-0400", CST: "-0600", CDT: "-0500", MST: "-0700", MDT: "-0600", PST: "-0800", PDT: "-0700" } 
}; 

/******************** 
 ** Future Strings ** 
 ******************** 
 * 
 * The following list of strings may not be currently being used, but 
 * may be incorporated into the Datejs library later. 
 * 
 * We would appreciate any help translating the strings below. 
 * 
 * If you modify this file, please post your revised CultureInfo file 
 * to the Datejs Forum located at http://www.datejs.com/forums/. 
 * 
 * Please mark the subject of the post with [CultureInfo]. Example: 
 *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark) 
 * 
 * English Name        Translated 
 * ------------------  ----------------- 
 * date                data 
 * time                hora|tempo? 
 * calendar            calendário 
 * show                mostrar? 
 * hourly              de hora em hora 
 * daily               diariamente 
 * weekly              semanalmente 
 * bi-weekly           bi-semanal 
 * fortnight           quinzena 
 * monthly             mensal 
 * bi-monthly          bi-mensal 
 * quarter             quarter 
 * quarterly           quarterly 
 * yearly              anual 
 * annual              anuário? 
 * annually            anualmente 
 * annum               ? 
 * again               novamente 
 * between             entre 
 * after               após 
 * from now            de agora? (no sense) 
 * repeat              repetir 
 * times               vezes 
 * per                 por 
 * min (abbrev minute) min (the same) 
 * morning             manhã 
 * noon                tarde 
 * night               noite 
 * midnight            meia-noite 
 * mid-night           meia-noite 
 * evening             anoitecer 
 * final               final (the same) 
 * future              futuro 
 * spring              primavera 
 * summer              verão 
 * fall                outono 
 * winter              inverno 
 */