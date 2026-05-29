// ================== app.js - PARTE 1/5 ==================
// CONFIGURACIÓN INICIAL Y DATOS MEJORADOS

const GH_MAYORES = 'https://raw.githubusercontent.com/appsjcm/oraculomistico/main/ama/';
const GH_MENORES = 'https://raw.githubusercontent.com/appsjcm/oraculomistico/main/ame/';
const MINOR_FILENAMES = {
    wands: { 'As':'ameb01.png','2':'ameb02.png','3':'ameb03.png','4':'ameb04.png','5':'ameb05.png','6':'ameb6.png','7':'ameb7.png','8':'ameb8.png','9':'ameb9.png','10':'ameb10.png','Sota':'ameb11.png','Caballero':'ameb12.png','Reina':'ameb13.png','Rey':'ameb14.png' },
    cups: { 'As':'amec1.png','2':'amec2.png','3':'amec3.png','4':'amec4.png','5':'amec5.png','6':'amec6.png','7':'amec7.png','8':'amec8.png','9':'amec9.png','10':'amec10.png','Sota':'amec11.png','Caballero':'amec12.png','Reina':'amec13.png','Rey':'amec14.png' },
    swords: { 'As':'amee1.png','2':'amee2.png','3':'amee3.png','4':'amee4.png','5':'amee5.png','6':'amee6.png','7':'amee7.png','8':'amee8.png','9':'amee9.png','10':'amee10.png','Sota':'amee11.png','Caballero':'amee12.png','Reina':'amee13.png','Rey':'amee14.png' },
    pents: { 'As':'ameo1.png','2':'ameo2.png','3':'ameo3.png','4':'ameo4.png','5':'ameo5.png','6':'ameo6.png','7':'ameo7.png','8':'ameo8.png','9':'ameo9.png','10':'ameo10.png','Sota':'ameo11.png','Caballero':'ameo12.png','Reina':'ameo13.png','Rey':'ameo14.png' }
};
function imgObj(ghUrl, stName) { return { main: ghUrl, fallback: 'https://www.sacred-texts.com/tarot/pkt/img/' + stName }; }
function getImgSrc(card) { return typeof card.img === 'string' ? card.img : card.img.main; }

// ARCANOS MAYORES (22) - con descripciones ya extensas, las dejamos como están
const MAJOR_ARCANA = [
    // ... (igual que en tu versión funcional, copia exactamente los 22 arcanos de tu app.js actual)
    // Para no duplicar aquí, asumo que los tienes. Si no, pídeme que los incluya.
];

// ARCANOS MENORES (56) con descripciones ampliadas para amor, trabajo, salud, espiritualidad
const MINOR_ARCANA = (() => {
    const suits = { wands: 'Bastos', cups: 'Copas', swords: 'Espadas', pents: 'Pentáculos' };
    const numbers = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Sota', 'Caballero', 'Reina', 'Rey'];
    const res = [];
    // Diccionario de significados detallados por palo y número
    const meanings = {
        wands: {
            As: { up: 'El As de Bastos es la chispa de la creatividad. En amor: nueva pasión, atracción intensa. Trabajo: inicio de un proyecto exitoso. Salud: energía renovada. Espiritualidad: descubrimiento de tu propósito.', rv: 'Invertido: falta de dirección, creatividad bloqueada. En amor: desinterés. Trabajo: proyectos estancados. Salud: agotamiento.' },
            '2': { up: 'Planificación y decisión. Amor: elegir entre dos opciones. Trabajo: sopesar pros y contras. Salud: equilibrio. Espiritualidad: discernimiento.', rv: 'Invertido: miedo a decidir, indecisión paralizante.' },
            '3': { up: 'Expansión y colaboración. Amor: relación que avanza. Trabajo: trabajo en equipo exitoso. Salud: mejoría gradual.', rv: 'Invertido: conflictos de ego, falta de cooperación.' },
            '4': { up: 'Estabilidad y celebración. Amor: relación segura. Trabajo: logros consolidados. Salud: recuperación.', rv: 'Invertido: estancamiento, falta de motivación.' },
            '5': { up: 'Competencia y desafíos. Amor: rivalidad. Trabajo: lucha por el poder. Salud: estrés.', rv: 'Invertido: conflictos resueltos, aprender de la derrota.' },
            '6': { up: 'Victoria y reconocimiento. Amor: triunfo amoroso. Trabajo: éxito público. Salud: buena forma.', rv: 'Invertido: orgullo herido, miedo al fracaso.' },
            '7': { up: 'Valentía y perseverancia. Amor: superar obstáculos. Trabajo: defensa de tus ideas. Salud: fortaleza.', rv: 'Invertido: agotamiento, rendirse ante la adversidad.' },
            '8': { up: 'Movimiento rápido. Amor: cambios repentinos. Trabajo: noticias urgentes. Salud: recuperación acelerada.', rv: 'Invertido: retrasos, falta de dirección.' },
            '9': { up: 'Resistencia y protección. Amor: defender la relación. Trabajo: enfrentar críticas. Salud: sistema inmune fuerte.', rv: 'Invertido: vulnerabilidad, sentirse atacado.' },
            '10': { up: 'Carga y responsabilidad. Amor: compromiso pesado. Trabajo: mucho trabajo. Salud: agotamiento.', rv: 'Invertido: liberación de cargas, delegar.' },
            Sota: { up: 'Mensajero entusiasta. Amor: nuevas ilusiones. Trabajo: aprendiz creativo. Salud: buenas noticias.', rv: 'Invertido: inmadurez, falta de compromiso.' },
            Caballero: { up: 'Acción impulsiva. Amor: declaración apasionada. Trabajo: iniciativa. Salud: energía explosiva.', rv: 'Invertido: impaciencia, actuar sin pensar.' },
            Reina: { up: 'Confianza y calidez. Amor: apoyo incondicional. Trabajo: liderazgo femenino. Salud: bienestar.', rv: 'Invertido: dependencia emocional, celos.' },
            Rey: { up: 'Liderazgo visionario. Amor: figura protectora. Trabajo: emprendedor exitoso. Salud: vitalidad.', rv: 'Invertido: autoritarismo, abuso de poder.' }
        },
        cups: {
            As: { up: 'Amor puro y emociones. En amor: nuevo romance. Trabajo: proyecto creativo. Salud: sanación emocional. Espiritualidad: apertura del corazón.', rv: 'Invertido: bloqueo emocional, falta de amor propio.' },
            '2': { up: 'Unión y atracción. Amor: conexión profunda. Trabajo: alianza exitosa. Salud: equilibrio.', rv: 'Invertido: desamor, ruptura.' },
            '3': { up: 'Celebración y amistad. Amor: relaciones armoniosas. Trabajo: éxito en equipo. Salud: alegría.', rv: 'Invertido: excesos, fiesta vacía.' },
            '4': { up: 'Apalancamiento emocional. Amor: necesidad de cambio. Trabajo: aburrimiento. Salud: monotonía.', rv: 'Invertido: despertar emocional, buscar nuevas experiencias.' },
            '5': { up: 'Pérdida y duelo. Amor: ruptura. Trabajo: fracaso. Salud: tristeza.', rv: 'Invertido: aceptación, inicio de sanación.' },
            '6': { up: 'Nostalgia y recuerdos. Amor: reencuentro. Trabajo: clientes antiguos. Salud: terapias de pasado.', rv: 'Invertido: vivir en el pasado, no avanzar.' },
            '7': { up: 'Elección ilusoria. Amor: fantasías. Trabajo: muchas opciones confusas. Salud: ilusiones.', rv: 'Invertido: claridad, tomar decisión realista.' },
            '8': { up: 'Abandono y cambio. Amor: dejar ir. Trabajo: renunciar a algo. Salud: soltar malos hábitos.', rv: 'Invertido: miedo a soltar, apego.' },
            '9': { up: 'Deseo cumplido. Amor: sueño hecho realidad. Trabajo: ascenso deseado. Salud: plenitud.', rv: 'Invertido: insatisfacción, falsas ilusiones.' },
            '10': { up: 'Felicidad plena. Amor: armonía total. Trabajo: éxito rotundo. Salud: bienestar completo.', rv: 'Invertido: ruptura familiar, desarmonía.' },
            Sota: { up: 'Mensajero emocional. Amor: declaración de amor. Trabajo: buena noticia. Salud: recuperación.', rv: 'Invertido: noticias tristes, desamor.' },
            Caballero: { up: 'Propuesta romántica. Amor: invitación a salir. Trabajo: oferta tentadora. Salud: mejora.', rv: 'Invertido: rechazo, oferta retirada.' },
            Reina: { up: 'Intuición y compasión. Amor: consejera amorosa. Trabajo: apoyo emocional. Salud: sanación.', rv: 'Invertido: drama emocional, manipulación.' },
            Rey: { up: 'Control emocional. Amor: pareja estable. Trabajo: líder empático. Salud: equilibrio emocional.', rv: 'Invertido: frialdad, represión emocional.' }
        },
        swords: {
            As: { up: 'Claridad mental. Amor: comunicación honesta. Trabajo: idea brillante. Salud: diagnóstico certero. Espiritualidad: verdad.', rv: 'Invertido: confusión, mentiras.' },
            '2': { up: 'Indecisión y bloqueo. Amor: no saber qué hacer. Trabajo: estancamiento. Salud: estrés mental.', rv: 'Invertido: liberación, toma de decisión.' },
            '3': { up: 'Dolor y traición. Amor: desamor. Trabajo: fracaso. Salud: enfermedad.', rv: 'Invertido: superación del dolor.' },
            '4': { up: 'Descanso y recuperación. Amor: tiempo a solas. Trabajo: pausa necesaria. Salud: reposo.', rv: 'Invertido: insomnio, estrés.' },
            '5': { up: 'Conflicto y derrota. Amor: discusión. Trabajo: competencia desleal. Salud: tensión.', rv: 'Invertido: reconciliación, dejar el orgullo.' },
            '6': { up: 'Superación y ayuda. Amor: dejar atrás. Trabajo: cambio de ambiente. Salud: mejora.', rv: 'Invertido: estancamiento, no avanzar.' },
            '7': { up: 'Engaño y astucia. Amor: mentiras. Trabajo: estrategia. Salud: diagnóstico falso.', rv: 'Invertido: verdad revelada, confesar.' },
            '8': { up: 'Sensación de estar atrapado. Amor: relación asfixiante. Trabajo: bloqueo. Salud: ansiedad.', rv: 'Invertido: liberación, encontrar salida.' },
            '9': { up: 'Angustia y pesadillas. Amor: preocupación. Trabajo: miedo al fracaso. Salud: insomnio.', rv: 'Invertido: superar miedos.' },
            '10': { up: 'Final doloroso. Amor: ruptura definitiva. Trabajo: fin de ciclo. Salud: colapso.', rv: 'Invertido: renacer tras el final.' },
            Sota: { up: 'Vigilancia y espionaje. Amor: curiosidad. Trabajo: investigación. Salud: chequeo.', rv: 'Invertido: chismes, mala información.' },
            Caballero: { up: 'Impulso mental. Amor: declaración racional. Trabajo: ataque verbal. Salud: crisis nerviosa.', rv: 'Invertido: perder la razón, ira.' },
            Reina: { up: 'Intelecto y honestidad. Amor: comunicación clara. Trabajo: liderazgo justo. Salud: mente lúcida.', rv: 'Invertido: crueldad, mentiras.' },
            Rey: { up: 'Autoridad intelectual. Amor: pareja racional. Trabajo: juez o abogado. Salud: control mental.', rv: 'Invertido: tiranía, abuso de poder mental.' }
        },
        pents: {
            As: { up: 'Abundancia material. Amor: relación sólida. Trabajo: nueva fuente de ingresos. Salud: bienestar físico. Espiritualidad: conexión con la tierra.', rv: 'Invertido: pérdida económica, avaricia.' },
            '2': { up: 'Equilibrio financiero. Amor: dar y recibir. Trabajo: multitarea. Salud: equilibrio.', rv: 'Invertido: desorden financiero.' },
            '3': { up: 'Trabajo en equipo. Amor: construir juntos. Trabajo: colaboración. Salud: recuperación.', rv: 'Invertido: falta de cooperación.' },
            '4': { up: 'Apego material. Amor: posesividad. Trabajo: acumular. Salud: rigidez.', rv: 'Invertido: desprendimiento, generosidad.' },
            '5': { up: 'Pérdida económica. Amor: sentirse desprotegido. Trabajo: crisis. Salud: carencia.', rv: 'Invertido: recuperación, aprender de la pérdida.' },
            '6': { up: 'Generosidad y ayuda. Amor: dar sin esperar. Trabajo: caridad. Salud: donación.', rv: 'Invertido: egoísmo, no recibir ayuda.' },
            '7': { up: 'Evaluación de inversión. Amor: pensar en el futuro. Trabajo: planificar. Salud: paciencia.', rv: 'Invertido: impaciencia, malas inversiones.' },
            '8': { up: 'Maestría y trabajo. Amor: construir relación. Trabajo: aprendizaje. Salud: constancia.', rv: 'Invertido: trabajo mal hecho, falta de enfoque.' },
            '9': { up: 'Autosuficiencia. Amor: independencia económica. Trabajo: éxito solitario. Salud: autocuidado.', rv: 'Invertido: soledad no deseada, dependencia.' },
            '10': { up: 'Riqueza y legado. Amor: familia estable. Trabajo: éxito total. Salud: plenitud.', rv: 'Invertido: pérdida de herencia, desorden.' },
            Sota: { up: 'Estudiante aplicado. Amor: nuevo interés. Trabajo: prácticas. Salud: aprendizaje.', rv: 'Invertido: pereza, no aprovechar oportunidades.' },
            Caballero: { up: 'Trabajo duro. Amor: constancia. Trabajo: movimiento laboral. Salud: ejercicio.', rv: 'Invertido: vagancia, procrastinación.' },
            Reina: { up: 'Generosidad y conexión con la naturaleza. Amor: cuidar. Trabajo: buena administradora. Salud: bienestar.', rv: 'Invertido: materialismo excesivo, avaricia.' },
            Rey: { up: 'Éxito financiero. Amor: proveedor. Trabajo: empresario. Salud: vitalidad.', rv: 'Invertido: codicia, corrupción.' }
        }
    };
    for (let s in suits) {
        for (let n of numbers) {
            let nameNum = n === 'As' ? 'As' : n;
            let fileName = MINOR_FILENAMES[s][n];
            if (!fileName) continue;
            let ghUrl = GH_MENORES + fileName;
            let stNum = n === 'As' ? '01' : (n === 'Sota' ? '11' : n === 'Caballero' ? '12' : n === 'Reina' ? '13' : n === 'Rey' ? '14' : (n < 10 ? '0' + n : n));
            let stName = `${s}_${stNum}.jpg`;
            let meaning = meanings[s][n] || meanings[s][nameNum] || { up: 'Energía positiva', rv: 'Bloqueos' };
            res.push({
                num: n, name: `${nameNum} de ${suits[s]}`, suitId: s, el: s === 'wands' ? 'Fuego' : s === 'cups' ? 'Agua' : s === 'swords' ? 'Aire' : 'Tierra',
                key: suits[s], emoji: '🃏', img: imgObj(ghUrl, stName),
                up: meaning.up,
                rv: meaning.rv
            });
        }
    }
    return res;
})();
const ALL_TAROT = [...MAJOR_ARCANA, ...MINOR_ARCANA];

// RUNAS (24) con descripciones ampliadas
const RUNAS = [
    { sym:'ᚠ', name:'Fehu', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Runic_letter_fehu_feoh_fe_f.svg/200px-Runic_letter_fehu_feoh_fe_f.svg.png', up:'Fehu: riqueza, prosperidad, abundancia material. Te invita a disfrutar de lo que has cosechado. En el amor: relaciones generosas. En el trabajo: éxito económico. En salud: vitalidad. Espiritualmente: la abundancia fluye cuando compartes.', rv:'Invertida: pérdidas, mala gestión, egoísmo. Revisa tus finanzas y actitud hacia el dinero. En el amor: desequilibrio en dar y recibir.' },
    { sym:'ᚢ', name:'Uruz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Runic_letter_uruz_ur_u.svg/200px-Runic_letter_uruz_ur_u.svg.png', up:'Uruz: fuerza vital, salud, poder. Energía bruta para superar obstáculos. En amor: pasión intensa. Trabajo: determinación. Salud: recuperación. Espiritualmente: conectar con tu fuerza interior.', rv:'Invertida: debilidad, agotamiento, falta de motivación. Necesitas descansar y recuperar energías.' },
    { sym:'ᚦ', name:'Thurisaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Runic_letter_thurisaz_thurs_thorn.svg/200px-Runic_letter_thurisaz_thurs_thorn.svg.png', up:'Thurisaz: protección, conflicto necesario, defensa. Es la runa del martillo de Thor. En amor: discusiones que limpian. Trabajo: enfrentar desafíos. Salud: intervención agresiva pero curativa.', rv:'Invertida: vulnerabilidad, traición, advertencia. Evita confrontaciones innecesarias.' },
    { sym:'ᚨ', name:'Ansuz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Runic_letter_ansuz_aesc_a.svg/200px-Runic_letter_ansuz_aesc_a.svg.png', up:'Ansuz: comunicación, sabiduría, consejo. Mensajes importantes, aprendizaje. En amor: diálogo sincero. Trabajo: reuniones exitosas. Salud: diagnóstico claro.', rv:'Invertida: malentendidos, engaño, falta de comunicación. Verifica la información.' },
    { sym:'ᚱ', name:'Raidho', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Runic_letter_raido_rad_reid_r.svg/200px-Runic_letter_raido_rad_reid_r.svg.png', up:'Raidho: viaje, movimiento, evolución. Cambios físicos o de perspectiva. En amor: viajar juntos. Trabajo: desplazamientos. Salud: rehabilitación.', rv:'Invertida: retrasos, estancamiento, viajes cancelados. Paciencia.' },
    { sym:'ᚲ', name:'Kenaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Runic_letter_kaun_k.svg/200px-Runic_letter_kaun_k.svg.png', up:'Kenaz: conocimiento, creatividad, pasión. Luz que ilumina lo oscuro. En amor: pasión renovada. Trabajo: ideas brillantes. Salud: diagnóstico que cura.', rv:'Invertida: oscuridad, bloqueo creativo, enfermedad. Enciende de nuevo tu luz interior.' },
    { sym:'ᚷ', name:'Gebo', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Runic_letter_gebo_gyfu_g.svg/200px-Runic_letter_gebo_gyfu_g.svg.png', up:'Gebo: regalo, asociación, generosidad. Equilibrio en el intercambio. En amor: matrimonio o unión. Trabajo: sociedades justas. Salud: donaciones.', rv:'No tiene reverso.' },
    { sym:'ᚹ', name:'Wunjo', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Runic_letter_wunjo_wynn_w.svg/200px-Runic_letter_wunjo_wynn_w.svg.png', up:'Wunjo: alegría, armonía, bienestar. Felicidad compartida. En amor: relaciones felices. Trabajo: éxito y buen ambiente. Salud: plenitud.', rv:'Invertida: tristeza, desarmonía, crisis. Busca la causa de tu infelicidad.' },
    { sym:'ᚺ', name:'Hagalaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Runic_letter_hagalaz_haegl_h.svg/200px-Runic_letter_hagalaz_haegl_h.svg.png', up:'Hagalaz: cambio disruptivo, caos necesario. Fuerza de la naturaleza. En amor: ruptura inesperada. Trabajo: crisis que limpia. Salud: enfermedad repentina.', rv:'No tiene reverso.' },
    { sym:'ᚾ', name:'Nauthiz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Runic_letter_naudiz_nyd_naud_n.svg/200px-Runic_letter_naudiz_nyd_naud_n.svg.png', up:'Nauthiz: necesidad, resistencia, aprendizaje a través del dolor. En amor: relaciones que enseñan. Trabajo: presión que forma. Salud: dolencias que requieren atención.', rv:'Invertida: restricciones, victimismo. Cambia de actitud.' },
    { sym:'ᛁ', name:'Isa', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Runic_letter_isaz_is_iss_i.svg/200px-Runic_letter_isaz_is_iss_i.svg.png', up:'Isa: inmovilidad, congelamiento, introspección. Todo se detiene. En amor: relaciones frías. Trabajo: proyectos paralizados. Salud: reposo necesario.', rv:'No tiene reverso.' },
    { sym:'ᛃ', name:'Jera', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Runic_letter_jera_j.svg/200px-Runic_letter_jera_j.svg.png', up:'Jera: cosecha, resultados, ciclos. Recompensa tras el esfuerzo. En amor: relaciones que maduran. Trabajo: éxito tras trabajo. Salud: recuperación gradual.', rv:'No tiene reverso.' },
    { sym:'ᛇ', name:'Eihwaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Runic_letter_iwaz_eoh.svg/200px-Runic_letter_iwaz_eoh.svg.png', up:'Eihwaz: resistencia, conexión espiritual, iniciación. Puente entre mundos. En amor: relaciones que superan pruebas. Trabajo: perseverancia. Salud: fortaleza.', rv:'Invertida: confusión, debilidad, ruptura. Reconecta con tu propósito.' },
    { sym:'ᛈ', name:'Perthro', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Runic_letter_pertho_peorth_p.svg/200px-Runic_letter_pertho_peorth_p.svg.png', up:'Perthro: misterio, destino, revelación. Lo desconocido. En amor: secretos que salen a la luz. Trabajo: sorpresas. Salud: diagnóstico inesperado.', rv:'Invertida: secretos, mala suerte. Investiga más.' },
    { sym:'ᛉ', name:'Algiz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Runic_letter_algiz.svg/200px-Runic_letter_algiz.svg.png', up:'Algiz: protección, defensa, oportunidad. Escudo contra el mal. En amor: relaciones seguras. Trabajo: apoyo de superiores. Salud: sistema inmune fuerte.', rv:'Invertida: vulnerabilidad, peligro. Extremar precauciones.' },
    { sym:'ᛊ', name:'Sowilo', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Runic_letter_sowilo_s.svg/200px-Runic_letter_sowilo_s.svg.png', up:'Sowilo: sol, éxito, energía, claridad. Ilumina tu camino. En amor: relaciones radiantes. Trabajo: éxito rotundo. Salud: vitalidad plena.', rv:'No tiene reverso.' },
    { sym:'ᛏ', name:'Tiwaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Runic_letter_tiwaz_tir_tyr_t.svg/200px-Runic_letter_tiwaz_tir_tyr_t.svg.png', up:'Tiwaz: victoria, justicia, sacrificio. Honor y liderazgo. En amor: relaciones basadas en el honor. Trabajo: éxito competitivo. Salud: fuerza de voluntad.', rv:'Invertida: derrota, injusticia. Recupera el honor.' },
    { sym:'ᛒ', name:'Berkano', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Runic_letter_berkanan_beorc_bjarkan_b.svg/200px-Runic_letter_berkanan_beorc_bjarkan_b.svg.png', up:'Berkano: crecimiento, fertilidad, nuevos comienzos. Runa de la madre tierra. En amor: embarazo, nuevos proyectos familiares. Trabajo: crecimiento. Salud: renacimiento.', rv:'Invertida: estancamiento, problemas familiares. Nutre lo que quieres que crezca.' },
    { sym:'ᛖ', name:'Ehwaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Runic_letter_ehwaz_eh_e.svg/200px-Runic_letter_ehwaz_eh_e.svg.png', up:'Ehwaz: progreso, confianza, trabajo en equipo. Movimiento suave. En amor: relaciones armoniosas. Trabajo: colaboración. Salud: mejoría gradual.', rv:'Invertida: obstáculos, falta de armonía. Revisa con quién caminas.' },
    { sym:'ᛗ', name:'Mannaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Runic_letter_mannaz_man_m.svg/200px-Runic_letter_mannaz_man_m.svg.png', up:'Mannaz: humanidad, comunidad, ayuda mutua. Tu papel en el grupo. En amor: apoyo de la pareja. Trabajo: trabajo en equipo. Salud: apoyo social.', rv:'Invertida: aislamiento, egoísmo. Ábrete a los demás.' },
    { sym:'ᛚ', name:'Laguz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Runic_letter_laukaz_lagu_logr_l.svg/200px-Runic_letter_laukaz_lagu_logr_l.svg.png', up:'Laguz: intuición, flujo, sanación emocional. Déjate llevar. En amor: conexión profunda. Trabajo: fluir con los cambios. Salud: terapias alternativas.', rv:'Invertida: confusión, miedo al cambio. Recupera la calma.' },
    { sym:'ᛜ', name:'Ingwaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Runic_letter_ingwaz.svg/200px-Runic_letter_ingwaz.svg.png', up:'Ingwaz: potencial, gestación, logro. Algo está gestándose. En amor: relación en potencia. Trabajo: proyecto en desarrollo. Salud: proceso de curación.', rv:'No tiene reverso.' },
    { sym:'ᛞ', name:'Dagaz', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Runic_letter_dagaz_daeg_d.svg/200px-Runic_letter_dagaz_daeg_d.svg.png', up:'Dagaz: día, despertar, transformación, esperanza. Cambio hacia la luz. En amor: reconciliación. Trabajo: cambios positivos. Salud: curación repentina.', rv:'No tiene reverso.' },
    { sym:'ᛟ', name:'Othala', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Runic_letter_othalan_ethel_o.svg/200px-Runic_letter_othalan_ethel_o.svg.png', up:'Othala: herencia, hogar, tradición. Lo que recibes de tus antepasados. En amor: relaciones estables. Trabajo: negocios familiares. Salud: enfermedades hereditarias.', rv:'Invertida: pérdida, desarraigo. Valora lo que tienes.' }
];

// FASES LUNARES (sin cambios)
const MOON_PHASES = [
    { sym:'🌑', name:'Luna Nueva', meaning:'Nuevos comienzos. Siembra intenciones. Es momento de introspección y de plantar las semillas de tus deseos.', ritual:'Escribe 10 deseos en un papel y guárdalos hasta la próxima luna llena.', affirmation:'Soy un nuevo comienzo.', el:'Agua' },
    { sym:'🌒', name:'Luna Creciente', meaning:'Acción y crecimiento. Las energías comienzan a moverse.', ritual:'Visualiza tus metas como si ya se hubieran cumplido.', affirmation:'Mis sueños se hacen realidad.', el:'Fuego' },
    { sym:'🌓', name:'Cuarto Creciente', meaning:'Decisiones y desafíos. La fuerza de voluntad aumenta.', ritual:'Medita frente a un espejo para conectar con tu poder interior.', affirmation:'Supero cualquier desafío.', el:'Fuego' },
    { sym:'🌔', name:'Gibosa Creciente', meaning:'Refinamiento. Ajusta los detalles de lo que has empezado.', ritual:'Revisa tu agenda y corrige lo que no fluye.', affirmation:'Perfecciono mi camino.', el:'Tierra' },
    { sym:'🌕', name:'Luna Llena', meaning:'Culminación y poder. Las cosechas están listas.', ritual:'Carga tus cristales bajo la luz de la luna llena.', affirmation:'Soy poderoso y completo.', el:'Agua' },
    { sym:'🌖', name:'Gibosa Menguante', meaning:'Gratitud y entrega. Agradece lo recibido y comparte.', ritual:'Escribe 10 cosas por las que estás agradecido.', affirmation:'Doy gracias y comparto mi luz.', el:'Tierra' },
    { sym:'🌗', name:'Cuarto Menguante', meaning:'Liberación y perdón. Deja ir rencores y ataduras.', ritual:'Quema en un papel lo que deseas soltar.', affirmation:'Libero con amor todo lo que me pesa.', el:'Aire' },
    { sym:'🌘', name:'Luna Menguante', meaning:'Descanso e integración. Recoge tus energías.', ritual:'Baño de sal marina para limpiar y restaurar.', affirmation:'Descanso y me restauro para un nuevo ciclo.', el:'Agua' }
];

// ================== VARIABLES GLOBALES ==================
let voiceSpeed = 1;
let selectedVoiceName = null;
let currentRec = null;
let lastState = {};
let historial = [];
let tarotChart, runasChart, tiradasChart;
let audioUnlocked = false;
let savedDreams = [];// ================== app.js - PARTE 2/5 ==================
// FUNCIONES AUXILIARES, MODALES, MICRÓFONOS, NOTAS

function toast(msg) {
    let t = document.createElement('div');
    t.className = 'toast';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function unlockAudio() {
    if (audioUnlocked) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const context = new AudioContext();
        context.resume().then(() => {
            audioUnlocked = true;
            console.log('Audio desbloqueado');
        }).catch(e => console.log('Error desbloqueando audio:', e));
    } else {
        audioUnlocked = true;
    }
}

function speakText(text) {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => speakText(text), { once: true });
        return;
    }
    window.speechSynthesis.cancel();
    let u = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    u.lang = 'es-ES';
    u.rate = voiceSpeed;
    let voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('es'));
    if (selectedVoiceName) u.voice = voices.find(v => v.name === selectedVoiceName);
    else if (voices.length) u.voice = voices[0];
    window.speechSynthesis.speak(u);
}

const TTS = { speak: speakText, stop: () => window.speechSynthesis?.cancel() };

function openModal(html) {
    let ov = document.createElement('div');
    ov.className = 'modal-overlay';
    let box = document.createElement('div');
    box.className = 'modal-box';
    box.innerHTML = html;
    let close = document.createElement('button');
    close.className = 'modal-close';
    close.innerHTML = '✕';
    close.onclick = () => ov.remove();
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
    box.appendChild(close);
    ov.appendChild(box);
    document.body.appendChild(ov);
    return ov;
}

function cardHTML(card, opts = {}) {
    let revClass = opts.reversed ? 'reversed' : '';
    let revBadge = opts.reversed ? '<div class="rev-badge">INV</div>' : '';
    let src = getImgSrc(card);
    let fallbackSrc = (card.img && card.img.fallback) ? card.img.fallback : '';
    let onerror = fallbackSrc ? `this.onerror=null;this.src='${fallbackSrc}';` : 'this.style.display="none";this.nextElementSibling.style.display="flex";';
    return `<div class="real-card ${opts.big ? 'big' : ''} ${revClass}" onclick="openCardModal(${JSON.stringify(card).replace(/"/g, '&quot;')}, ${!!opts.reversed})">${revBadge}<img src="${src}" onerror="${onerror}"><div class="card-fallback" style="display:none">🃏<span class="fb-name">${card.name}</span></div><div class="card-name-label">${card.name}</div></div>`;
}

function runeCardHTML(r) {
    return `<div class="rune-card" onclick="openRunaModal(${JSON.stringify(r).replace(/"/g, '&quot;')})"><img src="${r.img}" onerror="this.style.display='none'"><div class="rune-sym">${r.sym}</div><div class="rune-name">${r.name}</div></div>`;
}

// MODAL DE CARTA CON IA
window.openCardModal = function (card, rev) {
    let text = rev ? (card.rv || card.up) : (card.up);
    let modal = openModal(`
        <h2 style="color:var(--gold)">${card.name} ${rev ? '(Invertida)' : ''}</h2>
        <div>${cardHTML(card, { big: true, reversed: rev })}</div>
        <div class="interp-card"><p>${text}</p></div>
        <button class="btn-mystic btn-ia-modal" id="modalIaBtn">🔮 Consultar a la IA sobre esta carta</button>
        <button class="btn-mystic btn-save" id="saveNoteBtn">💾 Guardar en Notas</button>
    `);
    document.getElementById('saveNoteBtn')?.addEventListener('click', () => { saveNote(`${card.name}: ${text}`); modal.remove(); });
    document.getElementById('modalIaBtn')?.addEventListener('click', async () => {
        const prompt = `Interpreta en profundidad la carta del tarot ${card.name} (${rev ? 'en posición invertida' : 'en posición derecha'}). Explica su simbolismo, su mensaje para el amor, el trabajo, la salud y el crecimiento espiritual. Da consejos prácticos. Extensión: 400 palabras.`;
        document.getElementById('modalIaBtn').disabled = true;
        document.getElementById('modalIaBtn').innerText = '🤖 Consultando...';
        try {
            await new Promise(r => { if (window.puter?.ai) r(); else setTimeout(r, 1500); });
            let res = await puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
            let respuesta = typeof res === 'string' ? res : res.message?.content;
            let iaDiv = document.createElement('div');
            iaDiv.className = 'ia-interp';
            iaDiv.innerHTML = `<h3>🤖 Interpretación de la IA</h3><p>${respuesta.replace(/\n/g, '<br>')}</p>`;
            document.querySelector('.modal-box .interp-card').after(iaDiv);
            speakText(respuesta);
        } catch(e) {
            toast('Error al consultar la IA');
        } finally {
            document.getElementById('modalIaBtn').disabled = false;
            document.getElementById('modalIaBtn').innerText = '🔮 Consultar a la IA sobre esta carta';
        }
    });
};

window.openRunaModal = function (r, rev = false) {
    let text = rev ? (r.rv || r.up) : r.up;
    let modal = openModal(`
        <h2 style="color:var(--gold)">${r.name} ${rev ? '(Inv.)' : ''}</h2>
        <div>${runeCardHTML(r)}</div>
        <div class="interp-card"><p>${text}</p></div>
        <button class="btn-mystic btn-ia-modal" id="modalIaBtnRuna">🔮 Consultar a la IA sobre esta runa</button>
        <button class="btn-mystic btn-save" onclick="saveNote('Runa ${r.name}: ${text.replace(/'/g, "\\'")}');modal.remove();">Guardar</button>
    `);
    document.getElementById('modalIaBtnRuna')?.addEventListener('click', async () => {
        const prompt = `Interpreta en profundidad la runa ${r.name} (${rev ? 'invertida' : 'derecha'}). Explica su significado histórico, simbólico, y su mensaje para el amor, el trabajo, la salud y la espiritualidad. Extensión: 350 palabras.`;
        document.getElementById('modalIaBtnRuna').disabled = true;
        document.getElementById('modalIaBtnRuna').innerText = '🤖 Consultando...';
        try {
            await new Promise(r => { if (window.puter?.ai) r(); else setTimeout(r, 1500); });
            let res = await puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
            let respuesta = typeof res === 'string' ? res : res.message?.content;
            let iaDiv = document.createElement('div');
            iaDiv.className = 'ia-interp';
            iaDiv.innerHTML = `<h3>🤖 Interpretación de la IA</h3><p>${respuesta.replace(/\n/g, '<br>')}</p>`;
            document.querySelector('.modal-box .interp-card').after(iaDiv);
            speakText(respuesta);
        } catch(e) {
            toast('Error al consultar la IA');
        } finally {
            document.getElementById('modalIaBtnRuna').disabled = false;
            document.getElementById('modalIaBtnRuna').innerText = '🔮 Consultar a la IA sobre esta runa';
        }
    });
};

function initMicrophones() {
    document.querySelectorAll('[data-mic]').forEach(btn => {
        btn.addEventListener('click', () => {
            let targetId = btn.getAttribute('data-mic');
            let input = document.getElementById(targetId);
            if (!input) return;
            if (window.SpeechRecognition || window.webkitSpeechRecognition) {
                let rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                rec.lang = 'es-ES';
                rec.interimResults = false;
                rec.onstart = () => btn.classList.add('listening');
                rec.onresult = e => {
                    input.value = e.results[0][0].transcript;
                    btn.classList.remove('listening');
                };
                rec.onerror = () => btn.classList.remove('listening');
                rec.start();
                if (currentRec) currentRec.stop();
                currentRec = rec;
            } else toast('Dictado no soportado');
        });
    });
}

// ================== NOTAS ==================
function getNotes() { return JSON.parse(localStorage.getItem('oraculo_notes') || '[]'); }
function saveNote(content) {
    let notes = getNotes();
    notes.push({ date: new Date().toISOString(), content });
    localStorage.setItem('oraculo_notes', JSON.stringify(notes));
    renderNotes();
    toast('Nota guardada');
}
function renderNotes() {
    let notes = getNotes();
    let container = document.getElementById('notesList');
    let noNotes = document.getElementById('noNotes');
    if (notes.length === 0) {
        if (noNotes) noNotes.style.display = 'block';
        container.innerHTML = '';
        return;
    }
    if (noNotes) noNotes.style.display = 'none';
    container.innerHTML = notes.map((n, i) => `<div class="note-card" onclick="openNoteModal(${i})"><div class="note-date">${new Date(n.date).toLocaleString()}</div><div class="note-preview">${n.content.substring(0, 80)}...</div></div>`).join('');
}
window.openNoteModal = function (idx) {
    let note = getNotes()[idx];
    let modal = openModal(`<textarea id="editNote" class="note-editor">${note.content}</textarea><div class="action-buttons"><button class="btn-mystic btn-save" id="updateNote">Actualizar</button><button class="btn-mystic" id="deleteNote" style="background:#f87171;">Eliminar</button></div>`);
    document.getElementById('updateNote')?.addEventListener('click', () => {
        let newContent = document.getElementById('editNote').value;
        let notes = getNotes();
        notes[idx].content = newContent;
        notes[idx].date = new Date().toISOString();
        localStorage.setItem('oraculo_notes', JSON.stringify(notes));
        renderNotes();
        modal.remove();
    });
    document.getElementById('deleteNote')?.addEventListener('click', () => {
        let notes = getNotes();
        notes.splice(idx, 1);
        localStorage.setItem('oraculo_notes', JSON.stringify(notes));
        renderNotes();
        modal.remove();
    });
};
function addNoteFromEditor() {
    let text = document.getElementById('newNoteText').value.trim();
    if (!text) return toast('Escribe algo');
    saveNote(text);
    document.getElementById('newNoteText').value = '';
}// ================== app.js - PARTE 3/5 ==================
// HISTORIAL, ESTADÍSTICAS, IA, PERSONALIDAD

function loadHistory() {
    const stored = localStorage.getItem('oraculo_history');
    if (stored) historial = JSON.parse(stored);
    renderHistory();
}
function saveHistory() { localStorage.setItem('oraculo_history', JSON.stringify(historial)); }
function addToHistory(type, data, question) {
    const entry = { id: Date.now(), date: new Date().toISOString(), type, question: question || '', data };
    historial.unshift(entry);
    if (historial.length > 50) historial.pop();
    saveHistory();
    renderHistory();
}
function renderHistory() {
    const container = document.getElementById('historialList');
    if (!container) return;
    const searchTerm = document.getElementById('historySearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('historyTypeFilter')?.value || 'all';
    let filtered = historial.filter(entry => {
        if (typeFilter !== 'all' && entry.type !== typeFilter) return false;
        if (searchTerm) {
            const questionMatch = entry.question?.toLowerCase().includes(searchTerm);
            let dataMatch = false;
            if (entry.type === 'tarot') dataMatch = entry.data.card.name.toLowerCase().includes(searchTerm);
            if (entry.type === 'runa') dataMatch = entry.data.r.name.toLowerCase().includes(searchTerm);
            if (entry.type === 'tirada' && entry.data.cfg) dataMatch = entry.data.cfg.name.toLowerCase().includes(searchTerm);
            if (entry.type === 'daily') dataMatch = entry.data.card.name.toLowerCase().includes(searchTerm) || entry.data.runa.name.toLowerCase().includes(searchTerm);
            if (!questionMatch && !dataMatch) return false;
        }
        return true;
    });
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted)">No hay tiradas que coincidan.</p>';
        return;
    }
    container.innerHTML = filtered.map(entry => `
        <div class="historial-item" data-id="${entry.id}">
            <div class="historial-date">${new Date(entry.date).toLocaleString()}</div>
            <div class="historial-type">${entry.type === 'tarot' ? '🃏 TAROT' : entry.type === 'runa' ? 'ᚱ RUNA' : entry.type === 'tirada' ? '⚡ TIRADA' : '☀️ DIARIA'}</div>
            ${entry.question ? `<div class="historial-question">"${escapeHtml(entry.question)}"</div>` : ''}
            <div class="historial-summary">${getSummary(entry)}</div>
        </div>
    `).join('');
    document.querySelectorAll('.historial-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.dataset.id);
            const entry = historial.find(e => e.id === id);
            if (entry) showHistoryDetail(entry);
        });
    });
}
function getSummary(entry) {
    if (entry.type === 'tarot') return `Carta: ${entry.data.card.name} ${entry.data.rev ? '(Inv)' : ''}`;
    if (entry.type === 'runa') return `Runa: ${entry.data.r.name} ${entry.data.rev ? '(Inv)' : ''}`;
    if (entry.type === 'tirada') return entry.data.cfg ? `Tirada: ${entry.data.cfg.name} (${entry.data.drawn.length} cartas)` : `Tirada de runas (${entry.data.runes.length})`;
    if (entry.type === 'daily') return `Carta: ${entry.data.card.name}, Runa: ${entry.data.runa.name}`;
    return '';
}
function showHistoryDetail(entry) {
    let html = `<h2 style="color:var(--gold)">Detalle de la consulta</h2><p><strong>Fecha:</strong> ${new Date(entry.date).toLocaleString()}</p><p><strong>Tipo:</strong> ${entry.type}</p>`;
    if (entry.question) html += `<p><strong>Pregunta:</strong> "${entry.question}"</p>`;
    if (entry.type === 'tarot') {
        const card = entry.data.card, rev = entry.data.rev;
        html += `<div>${cardHTML(card, { big: true, reversed: rev })}</div><div class="interp-card"><p>${rev ? card.rv : card.up}</p></div>`;
    } else if (entry.type === 'runa') {
        const r = entry.data.r, rev = entry.data.rev;
        html += `<div style="transform:${rev ? 'rotate(180deg)' : 'none'}">${runeCardHTML(r)}</div><div class="interp-card"><p>${rev && r.rv ? r.rv : r.up}</p></div>`;
    } else if (entry.type === 'tirada') {
        if (entry.data.cfg) {
            html += `<p><strong>Tirada:</strong> ${entry.data.cfg.name}</p>`;
            entry.data.drawn.forEach(x => html += `<div><strong>${x.pos}:</strong> ${x.c.name} ${x.rev ? '(Inv)' : ''}</div>`);
        } else if (entry.data.runes) entry.data.runes.forEach((x,i) => html += `<div><strong>Posición ${i+1}:</strong> ${x.r.name} ${x.rev ? '(Inv)' : ''}</div>`);
    } else if (entry.type === 'daily') html += `<div>${cardHTML(entry.data.card, { big: true, reversed: entry.data.rev })}</div><div>${runeCardHTML(entry.data.runa)}</div>`;
    openModal(html);
}
function escapeHtml(str) { return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;'); }

function computeStats() {
    const stats = { tarot: {}, runas: {}, tiradas: {} };
    historial.forEach(entry => {
        if (entry.type === 'tarot') {
            const cardName = entry.data.card.name;
            stats.tarot[cardName] = (stats.tarot[cardName] || 0) + 1;
        } else if (entry.type === 'runa') {
            const runaName = entry.data.r.name;
            stats.runas[runaName] = (stats.runas[runaName] || 0) + 1;
        } else if (entry.type === 'tirada' && entry.data.cfg) {
            const tiradaName = entry.data.cfg.name;
            stats.tiradas[tiradaName] = (stats.tiradas[tiradaName] || 0) + 1;
        }
    });
    return stats;
}
function updateStatsCharts() {
    const stats = computeStats();
    const tarotSorted = Object.entries(stats.tarot).sort((a,b) => b[1] - a[1]).slice(0,5);
    if (tarotChart) tarotChart.destroy();
    const tarotCtx = document.getElementById('tarotChart')?.getContext('2d');
    if (tarotCtx) {
        tarotChart = new Chart(tarotCtx, { type: 'bar', data: { labels: tarotSorted.map(i=>i[0]), datasets: [{ label: 'Veces', data: tarotSorted.map(i=>i[1]), backgroundColor: 'rgba(255,215,0,0.6)', borderColor: '#FFD700', borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: true } });
    }
    const runasSorted = Object.entries(stats.runas).sort((a,b) => b[1] - a[1]).slice(0,5);
    if (runasChart) runasChart.destroy();
    const runasCtx = document.getElementById('runasChart')?.getContext('2d');
    if (runasCtx) {
        runasChart = new Chart(runasCtx, { type: 'bar', data: { labels: runasSorted.map(i=>i[0]), datasets: [{ label: 'Veces', data: runasSorted.map(i=>i[1]), backgroundColor: 'rgba(192,192,192,0.6)', borderColor: '#C0C0C0', borderWidth: 1 }] } });
    }
    const tiradasSorted = Object.entries(stats.tiradas).sort((a,b) => b[1] - a[1]).slice(0,5);
    if (tiradasChart) tiradasChart.destroy();
    const tiradasCtx = document.getElementById('tiradasChart')?.getContext('2d');
    if (tiradasCtx) {
        tiradasChart = new Chart(tiradasCtx, { type: 'pie', data: { labels: tiradasSorted.map(i=>i[0]), datasets: [{ data: tiradasSorted.map(i=>i[1]), backgroundColor: ['#FFD700','#C0C0C0','#B8860B','#FF69B4','#7B2FBE'] }] } });
    }
    const totalTiradas = historial.length;
    const totalTarot = Object.values(stats.tarot).reduce((a,b)=>a+b,0);
    const totalRunas = Object.values(stats.runas).reduce((a,b)=>a+b,0);
    document.getElementById('statsSummary').innerHTML = `<p>📊 Total de consultas: <strong>${totalTiradas}</strong></p><p>🃏 Cartas de Tarot: <strong>${totalTarot}</strong></p><p>ᚱ Runas: <strong>${totalRunas}</strong></p><p>⚡ Tiradas especiales: <strong>${Object.values(stats.tiradas).reduce((a,b)=>a+b,0)}</strong></p>`;
}

function getPersonalityPrompt(basePrompt) {
    const personality = document.getElementById('personalitySelect')?.value || 'sabio';
    const personas = { sabio: 'Eres un sabio consejero espiritual, hablas con serenidad y profundidad.', mistico: 'Eres un místico poético, hablas con metáforas y lenguaje enigmático.', bromista: 'Eres un oráculo bromista, con humor y sorpresas.', romantico: 'Eres un oráculo romántico, cálido y amoroso.' };
    return `${personas[personality]}\n\n${basePrompt}`;
}

async function getIA(type) {
    let container = document.getElementById(`${type}IAResult`);
    if (!container) return;
    container.innerHTML = '<div class="loading"><div class="loading-spinner"></div> El oráculo teje su respuesta...</div>';
    let prompt = '', state = lastState;
    if (type === 'daily' && state.daily) prompt = `Hoy la carta del tarot es ${state.daily.card.name} (${state.daily.rev ? 'invertida' : 'derecha'}) y la runa ${state.daily.runa.name} (${state.daily.rrev ? 'invertida' : 'derecha'}). Da una interpretación profunda de 350 palabras para el día de hoy.`;
    else if (type === 'tarot' && state.tarot) prompt = `Interpreta la carta ${state.tarot.card.name} (${state.tarot.rev ? 'invertida' : 'derecha'}) en respuesta a: "${state.tarot.q}". Lectura detallada de 400 palabras.`;
    else if (type === 'runa' && state.runa) prompt = `Interpreta la runa ${state.runa.r.name} (${state.runa.rev ? 'invertida' : 'derecha'}) para: "${state.runa.q}". Mensaje de 300 palabras.`;
    else if (type === 'tirada' && state.tirada) {
        if (state.tirada.type === 'chakras') prompt = `Tirada de 7 chakras: ${state.tirada.drawn.map((d,i)=>`${d.c.name} (${d.rev?'inv':'der'}) en chakra ${d.pos}`).join(', ')}. Interpretación incisiva de 400 palabras.`;
        else if (state.tirada.cfg) prompt = `Tirada ${state.tirada.cfg.name}: ${state.tirada.drawn.map(d=>`${d.c.name} (${d.rev?'inv':'der'}) en ${d.pos}`).join(', ')}. Pregunta: "${state.tirada.q}". Lectura de 400 palabras.`;
        else prompt = `Runas: ${state.tirada.runes.map(r=>`${r.r.name} (${r.rev?'inv':'der'})`).join(', ')}. Pregunta: "${state.tirada.q}". 350 palabras.`;
    }
    else if (type === 'dream' && state.dream) prompt = `Sueño: "${state.dream.txt}". Interpretación junguiana extensa de 350 palabras.`;
    else if (type === 'luna' && state.luna) prompt = `Fase lunar: ${state.luna.phase.name}. Significado: ${state.luna.phase.meaning}. Interpretación espiritual de 300 palabras.`;
    else if (type === 'numerologia' && state.num) prompt = `Número de vida ${state.num.lifePath}, expresión ${state.num.expression}. Análisis profundo de 400 palabras.`;
    else if (type === 'synastry' && state.syn) prompt = `Compatibilidad entre ${state.syn.n1} (${state.syn.lp1}) y ${state.syn.n2} (${state.syn.lp2}). Análisis de 350 palabras.`;
    else { container.innerHTML = '<p>Realiza una consulta primero.</p>'; return; }
    prompt = getPersonalityPrompt(prompt);
    try {
        await new Promise(r => { if (window.puter?.ai) r(); else setTimeout(r, 1500); });
        let res = await puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
        let text = typeof res === 'string' ? res : res.message?.content;
        container.innerHTML = `<div class="ia-interp"><p>${text.replace(/\n/g, '<br>')}</p></div>`;
        speakText(text);
        // Guardar interpretación de IA en el historial (solo para tiradas y cartas sueltas)
        if (type === 'tarot' && state.tarot) {
            addToHistory('ia_tarot', { card: state.tarot.card, rev: state.tarot.rev, question: state.tarot.q, interpretation: text }, state.tarot.q);
        } else if (type === 'runa' && state.runa) {
            addToHistory('ia_runa', { runa: state.runa.r, rev: state.runa.rev, question: state.runa.q, interpretation: text }, state.runa.q);
        } else if (type === 'tirada' && state.tirada && state.tirada.cfg) {
            addToHistory('ia_tirada', { cfg: state.tirada.cfg, drawn: state.tirada.drawn, question: state.tirada.q, interpretation: text }, state.tirada.q);
        }
    } catch (e) { container.innerHTML = `<div class="ia-interp">Error: ${e.message}</div>`; toast('Error de IA'); }
}// ================== app.js - PARTE 4/5 ==================
// CARTA DEL DÍA, TAROT, RUNAS, TIRADAS, LUNA, SUEÑOS, NUMEROLOGÍA

const DAILY_KEY = 'oraculo_daily';
function getDailyData() { const raw = localStorage.getItem(DAILY_KEY); if (!raw) return null; const data = JSON.parse(raw); if (data.date !== new Date().toDateString()) return null; return data; }
function saveDailyData(card, rev, runa, rrev) { localStorage.setItem(DAILY_KEY, JSON.stringify({ date: new Date().toDateString(), card, rev, runa, rrev })); }
function checkDailyButton() { const btn = document.getElementById('dailyDrawBtn'); const data = getDailyData(); if (data) { btn.disabled = true; btn.textContent = '🔒 Ya has revelado tu carta hoy'; showDailyResult(data); } else { btn.disabled = false; btn.textContent = '🌟 Revelar Mi Carta y Runa del Día'; } }
function showDailyResult(data) {
    lastState.daily = data;
    document.getElementById('dailyCardDisplay').innerHTML = `<div style="display:flex;gap:30px;justify-content:center;flex-wrap:wrap"><div>🃏 Tarot<br>${cardHTML(data.card,{big:true,reversed:data.rev})}</div><div>ᚱ Runa<br><div style="transform:${data.rrev?'rotate(180deg)':'none'}">${runeCardHTML(data.runa)}</div></div></div>`;
    document.getElementById('dailyResult').innerHTML = `<div class="result-area" id="daily-export"><div class="result-title">🌟 Mensaje del Día</div><div class="interp-card"><h3>${data.card.name} ${data.rev?'(Invertida)':''}</h3><p>${data.rev?data.card.rv:data.card.up}</p></div><div class="interp-card"><h3>${data.runa.name} ${data.rrev&&data.runa.rv&&data.runa.rv!=='No tiene reverso.'?'(Invertida)':''}</h3><p>${data.rrev&&data.runa.rv&&data.runa.rv!=='No tiene reverso.'?data.runa.rv:data.runa.up}</p></div><div id="dailyIAResult"></div></div>`;
    document.getElementById('dailyActions').style.display = 'flex';
    addToHistory('daily', { card: data.card, rev: data.rev, runa: data.runa, rrev: data.rrev }, '');
}
function drawDailyCard() { if (getDailyData()) { toast('🔒 Ya has revelado tu carta hoy. Vuelve mañana.'); return; } const card = ALL_TAROT[Math.floor(Math.random() * ALL_TAROT.length)]; const rev = Math.random() < 0.25; const runa = RUNAS[Math.floor(Math.random() * RUNAS.length)]; const rrev = Math.random() < 0.25; saveDailyData(card, rev, runa, rrev); checkDailyButton(); }

function drawTarot() {
    let card = ALL_TAROT[Math.floor(Math.random() * ALL_TAROT.length)];
    let rev = Math.random() < 0.25;
    lastState.tarot = { card, rev, q: document.getElementById('tarotQ').value };
    document.getElementById('tarotResult').innerHTML = `<div class="result-area" id="tarot-export"><div class="result-title">🎴 Tu Carta</div>${lastState.tarot.q ? `<p>"${lastState.tarot.q}"</p>` : ''}<div style="display:flex;justify-content:center">${cardHTML(card, { big: true, reversed: rev })}</div><div class="interp-card"><h3>${card.name} ${rev ? '(Invertida)' : ''}</h3><p>${rev ? card.rv : card.up}</p></div><div id="tarotIAResult"></div></div>`;
    document.getElementById('tarotActions').style.display = 'flex';
    const newCard = document.querySelector('#tarotResult .real-card');
    if (newCard) { newCard.classList.add('animate-flip'); setTimeout(() => newCard.classList.remove('animate-flip'), 600); }
    addToHistory('tarot', { card, rev }, lastState.tarot.q);
    // IA automática si está activada
    if (document.getElementById('tarotAutoIA')?.checked) {
        setTimeout(() => getIA('tarot'), 500);
    }
}

function drawRune() {
    let r = RUNAS[Math.floor(Math.random() * RUNAS.length)];
    let rev = Math.random() < 0.25;
    lastState.runa = { r, rev, q: document.getElementById('runaQ').value };
    document.getElementById('runaResult').innerHTML = `<div class="result-area" id="runa-export"><div class="result-title">ᚱ Tu Runa</div>${lastState.runa.q ? `<p>"${lastState.runa.q}"</p>` : ''}<div style="display:flex;justify-content:center;transform:${rev ? 'rotate(180deg)' : 'none'}">${runeCardHTML(r)}</div><div class="interp-card"><h3>${r.name} ${rev ? '(Invertida)' : ''}</h3><p>${rev && r.rv ? r.rv : r.up}</p></div><div id="runaIAResult"></div></div>`;
    document.getElementById('runaActions').style.display = 'flex';
    const newCard = document.querySelector('#runaResult .rune-card');
    if (newCard) { newCard.classList.add('animate-fade'); setTimeout(() => newCard.classList.remove('animate-fade'), 400); }
    addToHistory('runa', { r, rev }, lastState.runa.q);
    if (document.getElementById('runasAutoIA')?.checked) {
        setTimeout(() => getIA('runa'), 500);
    }
}

function doSpread(spreadType) {
    const cfgMap = {
        celtic: { n:10, pos:['Situación','Desafío','Base','Pasado','Corona','Futuro','Tú','Influencias','Esperanzas','Resultado'], name:'Cruz Celta' },
        ppf: { n:3, pos:['Pasado','Presente','Futuro'], name:'Pasado-Presente-Futuro' },
        love: { n:5, pos:['Tú','Otra persona','Conexión','Desafíos','Potencial'], name:'Amor' },
        yesno: { n:1, pos:['Respuesta'], name:'Sí o No' },
        week: { n:7, pos:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'], name:'Semana' },
        chakras: { n:7, pos:['Raíz','Sacral','Plexo Solar','Corazón','Garganta','Tercer Ojo','Corona'], name:'7 Chakras' },
        horseshoe: { n:7, pos:['Pasado','Situación','Futuro','Oculto','Influencia','Qué hacer','Resultado'], name:'Herradura' },
        star: { n:5, pos:['Espíritu','Agua','Fuego','Tierra','Aire'], name:'Estrella' },
        pyramid: { n:6, pos:['Base','Cuerpo','Mente','Emoción','Espíritu','Culminación'], name:'Pirámide' },
        elements: { n:5, pos:['Tierra','Agua','Fuego','Aire','Espíritu'], name:'5 Elementos' },
        zodiac: { n:12, pos:['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'], name:'12 Zodiacales' }
    };
    let cfg = cfgMap[spreadType];
    if (!cfg) return;
    let q = document.getElementById('tiradaQ').value;
    let drawn = [];
    for (let i=0; i<cfg.n; i++) { let card = ALL_TAROT[Math.floor(Math.random() * ALL_TAROT.length)]; let rev = Math.random() < 0.25; drawn.push({ c: card, rev, pos: cfg.pos[i] }); }
    lastState.tirada = { cfg, drawn, q, type: spreadType === 'chakras' ? 'chakras' : 'tarot' };
    let yn = '';
    if (spreadType === 'yesno') { let yesCards = ['El Sol','La Estrella','El Mundo','El Mago','Los Amantes','El Carro','La Fuerza']; let isYes = yesCards.some(n => drawn[0].c.name.includes(n)) && !drawn[0].rev; yn = `<div style="text-align:center;font-size:2.8rem;color:${isYes?'#4ade80':'#f87171'}">${isYes?'✅ SÍ':'🔴 NO'}</div>`; }
    let html = `<div class="result-area" id="tirada-export"><div class="result-title">⚡ ${cfg.name}</div>${q?`<p>"${q}"</p>`:''}${yn}<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:20px 0">${drawn.map(x=>`<div style="text-align:center"><div style="font-size:0.52rem;color:var(--gold);">${x.pos}</div>${cardHTML(x.c,{reversed:x.rev})}</div>`).join('')}</div>${drawn.map(x=>`<div class="interp-card"><h3>${x.pos}: ${x.c.name} ${x.rev?'(Inv.)':''}</h3><p>${x.rev?x.c.rv:x.c.up}</p></div>`).join('')}<div id="tiradaIAResult"></div></div>`;
    document.getElementById('tiradaResult').innerHTML = html;
    document.getElementById('tiradaActions').style.display = 'flex';
    const firstCard = document.querySelector('#tiradaResult .real-card');
    if (firstCard) { firstCard.classList.add('animate-flip'); setTimeout(() => firstCard.classList.remove('animate-flip'), 600); }
    addToHistory('tirada', { cfg, drawn }, q);
}

function drawThreeRunes() { let runes = []; for(let i=0;i<3;i++) { let r=RUNAS[Math.floor(Math.random()*RUNAS.length)]; let rev=Math.random()<0.25; runes.push({r,rev}); } let q = document.getElementById('tiradaQ').value; lastState.tirada = { runes, q, type: 'runes' }; let html = `<div class="result-area" id="tirada-export"><div class="result-title">ᚱ Tirada de 3 Runas</div>${q?`<p>"${q}"</p>`:''}<div style="display:flex;gap:20px;justify-content:center">${runes.map((x,i)=>`<div><div>${i===0?'Pasado':i===1?'Presente':'Futuro'}</div><div style="transform:${x.rev?'rotate(180deg)':'none'}">${runeCardHTML(x.r)}</div></div>`).join('')}</div>${runes.map((x,i)=>`<div class="interp-card"><h3>${i===0?'Pasado':i===1?'Presente':'Futuro'}: ${x.r.name} ${x.rev?'(Inv.)':''}</h3><p>${x.rev&&x.r.rv?x.r.rv:x.r.up}</p></div>`).join('')}<div id="tiradaIAResult"></div></div>`; document.getElementById('tiradaResult').innerHTML = html; document.getElementById('tiradaActions').style.display = 'flex'; addToHistory('tirada', { runes }, q); }
function drawFiveRunes() { let runes = []; for(let i=0;i<5;i++) { let r=RUNAS[Math.floor(Math.random()*RUNAS.length)]; let rev=Math.random()<0.25; runes.push({r,rev}); } let q = document.getElementById('tiradaQ').value; lastState.tirada = { runes, q, type: 'runes' }; let pos = ['Pasado','Presente','Futuro','Consejo','Resultado']; let html = `<div class="result-area" id="tirada-export"><div class="result-title">ᚱ Tirada de 5 Runas</div>${q?`<p>"${q}"</p>`:''}<div style="display:flex;gap:20px;justify-content:center">${runes.map((x,i)=>`<div><div>${pos[i]}</div><div style="transform:${x.rev?'rotate(180deg)':'none'}">${runeCardHTML(x.r)}</div></div>`).join('')}</div>${runes.map((x,i)=>`<div class="interp-card"><h3>${pos[i]}: ${x.r.name} ${x.rev?'(Inv.)':''}</h3><p>${x.rev&&x.r.rv?x.r.rv:x.r.up}</p></div>`).join('')}<div id="tiradaIAResult"></div></div>`; document.getElementById('tiradaResult').innerHTML = html; document.getElementById('tiradaActions').style.display = 'flex'; addToHistory('tirada', { runes }, q); }
function drawSevenRunes() { let runes = []; for(let i=0;i<7;i++) { let r=RUNAS[Math.floor(Math.random()*RUNAS.length)]; let rev=Math.random()<0.25; runes.push({r,rev}); } let q = document.getElementById('tiradaQ').value; lastState.tirada = { runes, q, type: 'runes' }; let pos = ['Pasado','Base','Presente','Futuro','Consejo','Influencia','Resultado']; let html = `<div class="result-area" id="tirada-export"><div class="result-title">ᚱ Tirada de 7 Runas</div>${q?`<p>"${q}"</p>`:''}<div style="display:flex;gap:20px;justify-content:center">${runes.map((x,i)=>`<div><div>${pos[i]}</div><div style="transform:${x.rev?'rotate(180deg)':'none'}">${runeCardHTML(x.r)}</div></div>`).join('')}</div>${runes.map((x,i)=>`<div class="interp-card"><h3>${pos[i]}: ${x.r.name} ${x.rev?'(Inv.)':''}</h3><p>${x.rev&&x.r.rv?x.r.rv:x.r.up}</p></div>`).join('')}<div id="tiradaIAResult"></div></div>`; document.getElementById('tiradaResult').innerHTML = html; document.getElementById('tiradaActions').style.display = 'flex'; addToHistory('tirada', { runes }, q); }

function getMoonPhaseForDate(date) { const newMoonDate = new Date('2024-01-11'); const diff = (date - newMoonDate) / (864e5); const age = ((diff % 29.53058867) + 29.53058867) % 29.53058867; let index = age < 1.85 ? 0 : age < 7.38 ? 1 : age < 9.22 ? 2 : age < 14.77 ? 3 : age < 16.61 ? 4 : age < 22.15 ? 5 : age < 23.99 ? 6 : 7; return MOON_PHASES[index]; }
function calcMoonForDate() { let dateInput = document.getElementById('moonDate').value; if (!dateInput) return toast('Selecciona una fecha'); let date = new Date(dateInput); let phase = getMoonPhaseForDate(date); lastState.luna = { phase }; document.getElementById('moonToday').innerHTML = `<div class="result-area" id="luna-export"><div class="result-title">🌙 Fase Lunar para ${date.toLocaleDateString()}</div><div style="text-align:center;font-size:4rem">${phase.sym}</div><div style="text-align:center;color:var(--gold);font-size:1.3rem;">${phase.name}</div><div class="interp-card"><p>${phase.meaning}</p><p><strong>Elemento:</strong> ${phase.el}</p><p>🕯️ ${phase.ritual}</p><p><em>${phase.affirmation}</em></p></div><div id="lunaIAResult"></div></div>`; document.getElementById('lunaActions').style.display = 'flex'; }
function calcMoonToday() { let phase = getMoonPhaseForDate(new Date()); lastState.luna = { phase }; document.getElementById('moonToday').innerHTML = `<div class="result-area" id="luna-export"><div class="result-title">🌙 Fase Lunar de Hoy</div><div style="text-align:center;font-size:4rem">${phase.sym}</div><div style="text-align:center;color:var(--gold);font-size:1.3rem;">${phase.name}</div><div class="interp-card"><p>${phase.meaning}</p><p><strong>Elemento:</strong> ${phase.el}</p><p>🕯️ ${phase.ritual}</p><p><em>${phase.affirmation}</em></p></div><div id="lunaIAResult"></div></div>`; document.getElementById('lunaActions').style.display = 'flex'; }
function drawMoon() { let phase = MOON_PHASES[Math.floor(Math.random() * MOON_PHASES.length)]; lastState.luna = { phase }; document.getElementById('lunaResult').innerHTML = `<div class="result-area" id="luna-export"><div class="result-title">🌕 Consulta Lunar Aleatoria</div><div style="text-align:center;font-size:3rem">${phase.sym}</div><div style="text-align:center;color:var(--gold);">${phase.name}</div><div class="interp-card"><p>${phase.meaning}</p><p>🕯️ ${phase.ritual}</p><p><em>${phase.affirmation}</em></p></div><div id="lunaIAResult"></div></div>`; document.getElementById('lunaActions').style.display = 'flex'; }

const dreamSymbols = { 'agua': 'Emociones, fluidez, inconsciente.', 'fuego': 'Pasión, transformación, energía.', 'volar': 'Libertad, ambición, expansión.', 'caída': 'Ansiedad, inseguridad, miedo al fracaso.', 'muerte': 'Cambio profundo, renacimiento, transformación.', 'casa': 'Tu mente, vida interior, seguridad.', 'dientes': 'Preocupación por imagen, comunicación.', 'serpiente': 'Sabiduría, peligro oculto, transformación.', 'gato': 'Intuición, independencia, misterio.', 'perro': 'Lealtad, amistad, protección.', 'escuela': 'Aprendizaje, evaluación, crecimiento.', 'boda': 'Unión, compromiso, integración.', 'dinero': 'Valor personal, seguridad, abundancia.' };
function searchSymbol() { let input = document.getElementById('symbolSearch').value.toLowerCase(); let resultDiv = document.getElementById('symbolResult'); if (!input) { resultDiv.innerHTML = ''; return; } let found = Object.entries(dreamSymbols).filter(([key]) => key.includes(input) || input.includes(key)); if (found.length > 0) { resultDiv.innerHTML = found.map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join(''); } else { resultDiv.innerHTML = '<p>No se encontró ese símbolo. Describe tu sueño con detalle para una interpretación personalizada.</p>'; } }
function saveDream() { let text = document.getElementById('dreamText').value.trim(); if (!text) return toast('Escribe un sueño'); savedDreams = JSON.parse(localStorage.getItem('saved_dreams') || '[]'); savedDreams.unshift({ date: new Date().toISOString(), text }); if (savedDreams.length > 20) savedDreams.pop(); localStorage.setItem('saved_dreams', JSON.stringify(savedDreams)); renderSavedDreams(); toast('Sueño guardado'); }
function renderSavedDreams() { savedDreams = JSON.parse(localStorage.getItem('saved_dreams') || '[]'); const container = document.getElementById('savedDreamsList'); if (!container) return; if (savedDreams.length === 0) { container.innerHTML = '<p class="section-desc">No hay sueños guardados aún.</p>'; return; } container.innerHTML = savedDreams.map((d, i) => `<div class="saved-dream-item" data-index="${i}">${new Date(d.date).toLocaleDateString()}: ${d.text.substring(0, 60)}...</div>`).join(''); document.querySelectorAll('.saved-dream-item').forEach(el => { el.addEventListener('click', () => { const idx = parseInt(el.dataset.index); document.getElementById('dreamText').value = savedDreams[idx].text; toast('Sueño cargado'); }); }); }
function interpretDream() { let txt = document.getElementById('dreamText').value.trim(); if (!txt) return toast('Describe tu sueño'); lastState.dream = { txt }; document.getElementById('dreamResult').innerHTML = `<div class="result-area" id="dream-export"><div class="result-title">💭 Interpretación</div><div class="interp-card"><p>Tu sueño refleja procesos internos. La IA te dará una visión más profunda.</p></div><div id="dreamIAResult"></div></div>`; document.getElementById('dreamActions').style.display = 'flex'; }
function dreamIA() { interpretDream(); setTimeout(() => getIA('dream'), 500); }

function reduceToSingle(n) { while(n>9 && n!==11 && n!==22 && n!==33) n=n.toString().split('').reduce((a,b)=>a+parseInt(b),0); return n; }
function nameToNumber(name) { if (!name) return 0; let clean = name.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑ]/g, ''); let sum = 0; const map = { 'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9,'J':1,'K':2,'L':3,'M':4,'N':5,'Ñ':5,'O':6,'P':7,'Q':8,'R':9,'S':1,'T':2,'U':3,'V':4,'W':5,'X':6,'Y':7,'Z':8,'Á':1,'É':5,'Í':9,'Ó':6,'Ú':3,'Ü':3 }; for (let c of clean) sum += map[c] || 0; return reduceToSingle(sum); }
function calcNumerologia() { let name = document.getElementById('numName').value || 'Consultante'; let dob = document.getElementById('numDob').value; let lifePath = '', expression = ''; if (dob) { let nums = dob.replace(/-/g, '').split('').map(Number); lifePath = reduceToSingle(nums.reduce((a,b)=>a+b,0)); } if (name) expression = nameToNumber(name); const lifeDesc = { 1:'Líder nato, independiente.',2:'Diplomático, cooperador.',3:'Creativo, comunicador.',4:'Constructor, disciplinado.',5:'Aventurero, libre.',6:'Cuidador, responsable.',7:'Sabio, analítico.',8:'Poderoso, exitoso.',9:'Humanitario, compasivo.',11:'Maestro inspirador.',22:'Maestro constructor.',33:'Maestro sanador.' }; let html = `<div class="result-area" id="numerologia-export"><div class="result-title">🔢 Numerología de ${name}</div>${lifePath ? `<div style="text-align:center"><span style="font-size:4rem;color:var(--gold);">${lifePath}</span><p>Camino de Vida</p></div><div class="num-details"><h3>✨ Tu misión</h3><p>${lifeDesc[lifePath] || ''}</p><h3>❤️ Salud</h3><p>Número Grabovoi: 9187948181</p><h3>💼 Trabajo y Economía</h3><p>Número: 5207418</p><h3>💑 Pareja</h3><p>Número: 8888888</p><div class="grabovoi-badge">🔢 Números de Grabovoi: <strong>9187948181</strong> (salud), <strong>5207418</strong> (dinero), <strong>8888888</strong> (amor), <strong>1891012</strong> (propósito).</div></div>` : ''}${expression ? `<div><span style="font-size:2rem;">${expression}</span><p>Expresión</p><p>Talento para ${expression===1?'liderar':expression===2?'mediar':expression===3?'crear':expression===4?'organizar':expression===5?'aventurar':expression===6?'cuidar':expression===7?'analizar':expression===8?'dirigir':expression===9?'servir':'inspirar'}</p></div>` : ''}</div>`; document.getElementById('numerologiaResult').innerHTML = html; lastState.num = { lifePath, expression }; document.getElementById('numerologiaActions').style.display = 'flex'; }
function calcSynastry() { let n1 = document.getElementById('synName1').value || 'Persona 1', d1 = document.getElementById('synDob1').value, n2 = document.getElementById('synName2').value || 'Persona 2', d2 = document.getElementById('synDob2').value; if (!d1 || !d2) return toast('Ingresa ambas fechas'); let lp1 = reduceToSingle(d1.replace(/-/g, '').split('').map(Number).reduce((a,b)=>a+b,0)); let lp2 = reduceToSingle(d2.replace(/-/g, '').split('').map(Number).reduce((a,b)=>a+b,0)); let e1 = nameToNumber(n1), e2 = nameToNumber(n2); let diff = Math.abs(lp1 - lp2); let compat = diff === 0 ? 'Almas gemelas ✨' : diff <= 2 ? 'Muy alta 💞' : diff <= 4 ? 'Buena 💕' : diff <= 6 ? 'Media 💫' : 'Kármica 🔮'; let html = `<div class="result-area" id="synastry-export"><div class="result-title">❤️ ${n1} y ${n2}</div><div style="display:flex;justify-content:center;gap:40px"><div><strong>${n1}</strong><br><span style="font-size:2.5rem;color:var(--gold);">${lp1}</span>${e1 ? `<br>Expresión ${e1}` : ''}</div><div><strong>${n2}</strong><br><span style="font-size:2.5rem;color:var(--gold);">${lp2}</span>${e2 ? `<br>Expresión ${e2}` : ''}</div></div><p style="text-align:center">Compatibilidad: <strong>${compat}</strong></p><div class="num-details"><h3>💞 Interpretación</h3><p>Diferencia de ${diff}. ${diff === 0 ? 'Almas gemelas.' : diff <= 2 ? 'Muy alta.' : diff <= 4 ? 'Buena.' : diff <= 6 ? 'Media.' : 'Kármica.'}</p></div><div id="synastryIAResult"></div></div>`; document.getElementById('synastryResult').innerHTML = html; lastState.syn = { n1, n2, lp1, lp2 }; document.getElementById('synastryActions').style.display = 'flex'; }

const mirrorMeanings = { '00:00':'Nuevo ciclo comienza.', '01:01':'Confía en tu intuición.', '02:02':'Alianza y cooperación.', '03:03':'Expresión creativa.', '04:04':'Estructura y orden.', '05:05':'Cambio positivo.', '06:06':'Amor y armonía.', '07:07':'Espiritualidad.', '08:08':'Abundancia.', '09:09':'Cierre de ciclos.', '10:10':'Nuevos comienzos.', '11:11':'Portal de manifestación.', '12:12':'Alineación divina.', '13:13':'Transformación.', '14:14':'Adaptación.', '15:15':'Libertad.', '16:16':'Introspección.', '17:17':'Fe y optimismo.', '18:18':'Manifestación.', '19:19':'Culminación.', '20:20':'Equilibrio.', '21:21':'Éxito asegurado.', '22:22':'Maestro constructor.', '23:23':'Protección espiritual.', '111':'Pensamiento positivo.', '222':'Confianza.', '333':'Presencia de maestros.', '444':'Protección.', '555':'Cambio radical.', '666':'Equilibrio.', '777':'Buena suerte.', '888':'Abundancia infinita.', '999':'Cierre completo.' };
function interpretMirror() { let input = document.getElementById('mirrorNumber').value.trim(); if (!input) return toast('Escribe una hora espejo o número repetido'); let meaning = mirrorMeanings[input] || mirrorMeanings[input.replace(':', '')] || 'Este número te invita a reflexionar. Presta atención a tus pensamientos y emociones.'; document.getElementById('mirrorResult').innerHTML = `<div class="result-area"><div class="result-title">🕒 Número Espejo: ${input}</div><div class="interp-card"><p>${meaning}</p></div></div>`; }
function copyGrabovoi(code) { navigator.clipboard.writeText(code).then(() => { document.getElementById('grabovoiInfo').innerHTML = `<p>✅ Código ${code} copiado al portapapeles. Puedes usarlo para meditación o escribirlo.</p>`; setTimeout(() => { document.getElementById('grabovoiInfo').innerHTML = ''; }, 3000); }).catch(() => toast('No se pudo copiar')); }

function sendChat() { let input = document.getElementById('chatInput'); let msg = input.value.trim(); if (!msg) return; let chatHistory = document.getElementById('chatHistory'); let userMsg = document.createElement('div'); userMsg.className = 'chat-msg user'; userMsg.innerText = msg; chatHistory.appendChild(userMsg); input.value = ''; let botMsg = document.createElement('div'); botMsg.className = 'chat-msg bot'; botMsg.innerText = '🤔 Pensando...'; chatHistory.appendChild(botMsg); chatHistory.scrollTop = chatHistory.scrollHeight; (async () => { try { const personality = document.getElementById('personalitySelect')?.value || 'sabio'; const personas = { sabio:'Eres un sabio consejero espiritual', mistico:'Eres un místico poético', bromista:'Eres un oráculo bromista', romantico:'Eres un oráculo romántico' }; let res = await puter.ai.chat([{ role: 'system', content: personas[personality] }, { role: 'user', content: msg }], { model: 'gpt-4o-mini' }); let text = typeof res === 'string' ? res : res.message?.content; botMsg.innerText = text; speakText(text); } catch(e) { botMsg.innerText = 'Error, intenta de nuevo.'; } })(); }const CACHE_NAME = 'oraculo-v1';
const urlsToCache = [ '/', '/index.html', '/styles.css', '/app.js', '/manifest.json' ];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener('fetch', event => { event.respondWith(caches.match(event.request).then(response => response || fetch(event.request))); });
