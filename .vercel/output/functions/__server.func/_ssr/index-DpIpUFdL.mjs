import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as Papa } from "../_libs/papaparse.mjs";
import { u as useI18n } from "./router-BBaajQ2s.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slider, a as SliderTrack, b as SliderRange, c as SliderThumb } from "../_libs/radix-ui__react-slider.mjs";
import { S as SlidersHorizontal, L as Languages, R as RotateCcw } from "../_libs/lucide-react.mjs";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
const rawSpeciesMap = {
  "פרפרים": [
    { "scientific_name": "Euchloe aegyptiaca", "hebrew_name": "ירוק־כנף מצרי", "english_name": "" },
    { "scientific_name": "Euchloe falloui", "hebrew_name": "ירוק-כנף המוריקה", "english_name": "" },
    { "scientific_name": "Allancastria deyrollei", "hebrew_name": "צבעוני צהבהב", "english_name": "" },
    { "scientific_name": "Zerynthia cerisy", "hebrew_name": "צבעוני קשוט", "english_name": "" },
    { "scientific_name": "Elphinstonia charlonia", "hebrew_name": "ירוק-כנף צהבהב", "english_name": "" },
    { "scientific_name": "Cigaritis cilissa", "hebrew_name": "נחושתן-נמלים גלילי", "english_name": "" },
    { "scientific_name": "Borbo borbonica", "hebrew_name": "הספרית ביצות", "english_name": "Zeller's Skipper" },
    { "scientific_name": "Belenois aurota", "hebrew_name": "לבנין משויש", "english_name": "" },
    { "scientific_name": "Gegenes nostrodamus", "hebrew_name": "הספרית עשב", "english_name": "" },
    { "scientific_name": "Hypolimnas misippus", "hebrew_name": "נימפית הרגלה", "english_name": "" },
    { "scientific_name": "Hyponephele lupinus", "hebrew_name": "סטירית סומית", "english_name": "" },
    { "scientific_name": "Papilio saharae", "hebrew_name": "זנב-סנונית מדברי", "english_name": "" },
    { "scientific_name": "Turanana panagea", "hebrew_name": "תכול-כנף נקוד", "english_name": "" },
    { "scientific_name": "Iolaus glaucus", "hebrew_name": "תכלתן ההרנוג", "english_name": "" },
    { "scientific_name": "Junonia hierta", "hebrew_name": "נימפית הריסן", "english_name": "" },
    { "scientific_name": "Polyommatus eurypilus", "hebrew_name": "כחליל הכרבולת", "english_name": "" },
    { "scientific_name": "Cigaritis acamas", "hebrew_name": "נחושתן-נמלים מפוספס", "english_name": "" },
    { "scientific_name": "Luthrodes galba", "hebrew_name": "כחליל הקטנית", "english_name": "" },
    { "scientific_name": "Quercusia quercus", "hebrew_name": "אלוני סגול", "english_name": "" },
    { "scientific_name": "Callophrys rubi", "hebrew_name": "ירוקי אירופי", "english_name": "" },
    { "scientific_name": "Polyommatus juno", "hebrew_name": "כחליל החרמון", "english_name": "" },
    { "scientific_name": "Plebejus loewii", "hebrew_name": "כחליל לואי", "english_name": "" },
    { "scientific_name": "Kretania nichollae", "hebrew_name": "כחליל ניקול", "english_name": "" },
    { "scientific_name": "Cyaniris semiargus", "hebrew_name": "כחליל חינני", "english_name": "" },
    { "scientific_name": "Plebejus cleopatra", "hebrew_name": "כחליל קלאופטרה", "english_name": "" },
    { "scientific_name": "Plebeius philbyi", "hebrew_name": "כחליל ערבתי", "english_name": "" },
    { "scientific_name": "Luthrodes pandava", "hebrew_name": "כחליל הציקס", "english_name": "" },
    { "scientific_name": "Aricia crassipuncta", "hebrew_name": "כחליל מאפיר", "english_name": "" },
    { "scientific_name": "Tarucus rosacea", "hebrew_name": "כחלון השיזף", "english_name": "" },
    { "scientific_name": "Anthocharis gruneri", "hebrew_name": "כתום-כנף הדו-פרית", "english_name": "" },
    { "scientific_name": "Anthocharis damone", "hebrew_name": "כתום-כנף צהוב", "english_name": "" },
    { "scientific_name": "Pieris napi", "hebrew_name": "לבנין מעורק", "english_name": "" },
    { "scientific_name": "Colias aurorina", "hebrew_name": "צהבוני הלבנון", "english_name": "" },
    { "scientific_name": "Hesperia nomas", "hebrew_name": "אפורית מלבינה", "english_name": "" },
    { "scientific_name": "Muschampia proteides lycaonius", "hebrew_name": "אפורית חלודית", "english_name": "" },
    { "scientific_name": "Muschampia proto", "hebrew_name": "אפורית אירופית", "english_name": "" },
    { "scientific_name": "Melitaea arduinna", "hebrew_name": "כתמית הדרדר", "english_name": "" },
    { "scientific_name": "Melitaea deserticola", "hebrew_name": "כתמית מדברית", "english_name": "" },
    { "scientific_name": "Melitaea collina", "hebrew_name": "כתמית צפונית", "english_name": "" },
    { "scientific_name": "Carcharodus orientalis", "hebrew_name": "אפורית המכבים", "english_name": "" },
    { "scientific_name": "Thymelicus acteon", "hebrew_name": "נחושת השעורה", "english_name": "" },
    { "scientific_name": "Thymelicus hyrax", "hebrew_name": "נחושה נאה", "english_name": "" },
    { "scientific_name": "Aglais urticae", "hebrew_name": "נימפית החרמון", "english_name": "" },
    { "scientific_name": "Thymelicus lineola", "hebrew_name": "נחושת החיטה", "english_name": "" },
    { "scientific_name": "Fabriciana niobe", "hebrew_name": "כתמית הסיגל", "english_name": "" },
    { "scientific_name": "Carcharodus stauderi", "hebrew_name": "אפורית הגלונית", "english_name": "" },
    { "scientific_name": "Nymphalis polychloros", "hebrew_name": "נימפית מגוונת", "english_name": "" },
    { "scientific_name": "Satyrus ferula", "hebrew_name": "סטירית מפויחת", "english_name": "" },
    { "scientific_name": "Pyrgus serratulae", "hebrew_name": "אפורית החמשן", "english_name": "" },
    { "scientific_name": "Pseudochazara thelephassa", "hebrew_name": "סטירית מערות", "english_name": "" },
    { "scientific_name": "Elphinstonia penia", "hebrew_name": "ירוק-כנף המנתור", "english_name": "" },
    { "scientific_name": "Anthene amarah", "hebrew_name": "שיטן אילתי", "english_name": "" },
    { "scientific_name": "Aricia isaurica", "hebrew_name": "כחליל חיוור", "english_name": "" },
    { "scientific_name": "Gomalia elma", "hebrew_name": "אפורית האבוטילון", "english_name": "" },
    { "scientific_name": "Polygonia c-album", "hebrew_name": "נימפית טוביה", "english_name": "" },
    { "scientific_name": "Colias croceus", "hebrew_name": "צהבוני התלתן", "english_name": "" },
    { "scientific_name": "Limenitis reducta", "hebrew_name": "אצילית היערה", "english_name": "" },
    { "scientific_name": "Papilio machaon", "hebrew_name": "זנב סנונית נאה", "english_name": "" },
    { "scientific_name": "Papilio demoleus", "hebrew_name": "זנב סנונית הלימון", "english_name": "Lime Butterfly" },
    { "scientific_name": "Papilio alexanor", "hebrew_name": "זנב סנונית המכבים", "english_name": "" },
    { "scientific_name": "Pararge aegeria", "hebrew_name": "חומית מנומרת", "english_name": "" },
    { "scientific_name": "Hesperia comma", "hebrew_name": "נחושה לבנת-כתמים", "english_name": "" },
    { "scientific_name": "Thymelicus sylvestris", "hebrew_name": "נחושת הנשרן", "english_name": "" },
    { "scientific_name": "Lycaena", "hebrew_name": "נחושתן זהוב", "english_name": "" },
    { "scientific_name": "Lycaena phlaeas", "hebrew_name": "נחושתן הארכובית", "english_name": "" },
    { "scientific_name": "Spialia phlomidis", "hebrew_name": "נקדית החרמון", "english_name": "" },
    { "scientific_name": "Spialia sertorius", "hebrew_name": "נקדית הורדיים", "english_name": "" },
    { "scientific_name": "Vanessa cardui", "hebrew_name": "נימפית החורשף", "english_name": "" },
    { "scientific_name": "Vanessa atalanta", "hebrew_name": "נמפית הסרפד", "english_name": "" },
    { "scientific_name": "Melitaea cinxia", "hebrew_name": "כתמית הוורוניקה", "english_name": "" },
    { "scientific_name": "Melitaea trivia", "hebrew_name": "כתמית הבוצין", "english_name": "" },
    { "scientific_name": "Damora pandora", "hebrew_name": "כתמית פנדורה", "english_name": "" },
    { "scientific_name": "Melitaea telona", "hebrew_name": "כיתמית אריאל", "english_name": "" },
    { "scientific_name": "Spialia doris", "hebrew_name": "נקדית החבלבל", "english_name": "" },
    { "scientific_name": "Iphiclides podalirius", "hebrew_name": "סנוניתן הוורדיים", "english_name": "" },
    { "scientific_name": "Lasiommata maera", "hebrew_name": "חומית היבלית", "english_name": "" },
    { "scientific_name": "Pseudochazara pelopea", "hebrew_name": "סטירית חרמונית", "english_name": "" },
    { "scientific_name": "Hyponephele lycaon", "hebrew_name": "סטירית חיוורת", "english_name": "" },
    { "scientific_name": "Chazara persephone", "hebrew_name": "סטירית טלואה", "english_name": "" },
    { "scientific_name": "Lasiommata megera", "hebrew_name": "חומית הציבורת", "english_name": "" },
    { "scientific_name": "Hipparchia fatua", "hebrew_name": "סטירית אפלה", "english_name": "" },
    { "scientific_name": "Maniola telmessia", "hebrew_name": "סטירית פקוחה", "english_name": "" },
    { "scientific_name": "Zerynthia deyrollei", "hebrew_name": "צבעוני צהוב", "english_name": "" },
    { "scientific_name": "Archon apollinus", "hebrew_name": "צבעון שקוף", "english_name": "" },
    { "scientific_name": "Tomares nesimachus", "hebrew_name": "צמריר הקדד", "english_name": "" },
    { "scientific_name": "Aporia crataegi", "hebrew_name": "רשתן העוזרר", "english_name": "" },
    { "scientific_name": "Danaus chrysippus", "hebrew_name": "דנאית הדורה", "english_name": "" },
    { "scientific_name": "Colotis fausta", "hebrew_name": "דרומי הצלף", "english_name": "" },
    { "scientific_name": "Pelopidas thrax", "hebrew_name": "הספרית הדוחן", "english_name": "" },
    { "scientific_name": "Gegenes pumilio", "hebrew_name": "הספרית שחורה", "english_name": "" },
    { "scientific_name": "Catopsilia florella", "hebrew_name": "הגרן הסנא", "english_name": "" },
    { "scientific_name": "Tarucus balkanica", "hebrew_name": "כחלון הבלקן", "english_name": "" },
    { "scientific_name": "Cacyreus marshalli", "hebrew_name": "כחלון הפלרגון", "english_name": "" },
    { "scientific_name": "Azanus ubaldus", "hebrew_name": "כחלון השיטה", "english_name": "" },
    { "scientific_name": "Leptotes pirithous", "hebrew_name": "כחלון האספסת", "english_name": "" },
    { "scientific_name": "Thersamonia thersamon", "hebrew_name": "נחושתן החומעה", "english_name": "" },
    { "scientific_name": "Lampides boeticus", "hebrew_name": "כחלון האפון", "english_name": "" },
    { "scientific_name": "Plebejus amanda", "hebrew_name": "כחליל הבקיה", "english_name": "" },
    { "scientific_name": "Zizeeria karsandra", "hebrew_name": "כחלון הקוטב", "english_name": "" },
    { "scientific_name": "Polyommatus icarus", "hebrew_name": "כחליל השברק", "english_name": "" },
    { "scientific_name": "Pseudophilotes baton", "hebrew_name": "תכליל האזוב", "english_name": "" },
    { "scientific_name": "Nordmannia ilicis", "hebrew_name": "שעיר האלון", "english_name": "" },
    { "scientific_name": "Plebejidea loewi", "hebrew_name": "כחליל המדבר", "english_name": "" },
    { "scientific_name": "Azanus jesous", "hebrew_name": "כחלון הינבוט", "english_name": "" },
    { "scientific_name": "Lycaena asabinus", "hebrew_name": "נחושתן מזרחי", "english_name": "" },
    { "scientific_name": "Anthocharis cardamines", "hebrew_name": "כתום-כנף המצילתיים", "english_name": "" },
    { "scientific_name": "Melitaea acentria", "hebrew_name": "כתמית החרמון", "english_name": "" },
    { "scientific_name": "Melitaea didyma", "hebrew_name": "כתמית הלבנון", "english_name": "" },
    { "scientific_name": "Issoria lathonia", "hebrew_name": "כתמית פנינים", "english_name": "" },
    { "scientific_name": "Celastrina argiolus", "hebrew_name": "תכול-כנף קיסוסי", "english_name": "" },
    { "scientific_name": "Iolana alfierii", "hebrew_name": "קרקשי הסנה", "english_name": "" },
    { "scientific_name": "Satyrium myrtale", "hebrew_name": "שעיר הדובדבן", "english_name": "" },
    { "scientific_name": "Satyrium abdominalis", "hebrew_name": "שעיר השקד", "english_name": "" },
    { "scientific_name": "Tuttiola spini", "hebrew_name": "שעיר האשחר", "english_name": "" },
    { "scientific_name": "Parnassius mnemosyne", "hebrew_name": "שילגן חרמוני", "english_name": "" },
    { "scientific_name": "Melanargia titea", "hebrew_name": "אביבית משויישת", "english_name": "" },
    { "scientific_name": "Carcharodus alceae", "hebrew_name": "אפורית החלמית", "english_name": "" },
    { "scientific_name": "Erynnis marloyi", "hebrew_name": "אפורית אפלולית", "english_name": "" },
    { "scientific_name": "Colotis phisadia", "hebrew_name": "דרומי הסלודורה", "english_name": "" },
    { "scientific_name": "Pieris rapae", "hebrew_name": "לבנין הצנון", "english_name": "" },
    { "scientific_name": "Pontia daplidice", "hebrew_name": "לבנין הרכפה", "english_name": "" },
    { "scientific_name": "Pontia glauconome", "hebrew_name": "לבנין הרכפתן", "english_name": "" },
    { "scientific_name": "Pieris brassicae", "hebrew_name": "לבנין הכרוב", "english_name": "" },
    { "scientific_name": "Euchloe ausonia", "hebrew_name": "ירוק-כנף טלוא", "english_name": "" },
    { "scientific_name": "Euchloe belemia", "hebrew_name": "ירוק-כנף מפוספס", "english_name": "" },
    { "scientific_name": "Gonepteryx cleopatra", "hebrew_name": "לימוני האשחר", "english_name": "" },
    { "scientific_name": "Gonepteryx rhamni", "hebrew_name": "לימוני אירופי", "english_name": "" },
    { "scientific_name": "Gonepteryx farinosa", "hebrew_name": "לימונית החרמון", "english_name": "" },
    { "scientific_name": "Pyrgus melotis", "hebrew_name": "אפורית מזרחית", "english_name": "" },
    { "scientific_name": "Junonia orithya", "hebrew_name": "נימפית כחולה", "english_name": "" },
    { "scientific_name": "Aricia agestis", "hebrew_name": "כחליל הגרניון", "english_name": "" },
    { "scientific_name": "Ypthima asterope", "hebrew_name": "טבעית זוטית", "english_name": "" },
    { "scientific_name": "Hipparchia pisidice", "hebrew_name": "סטירית סיני", "english_name": "" },
    { "scientific_name": "Pseudophilotes abencerragus", "hebrew_name": "תכליל נבטי", "english_name": "" },
    { "scientific_name": "Freyeria trochylus", "hebrew_name": "כחליל מקושט", "english_name": "" },
    { "scientific_name": "Glaucopsyche alexis", "hebrew_name": "כחליל הדבשה", "english_name": "" },
    { "scientific_name": "Melitaea phoebe", "hebrew_name": "כתמית אירופית", "english_name": "" },
    { "scientific_name": "Kirinia roxelana", "hebrew_name": "חומנית עינונית", "english_name": "" },
    { "scientific_name": "Maniola jurtina", "hebrew_name": "סטירית הקיץ", "english_name": "" },
    { "scientific_name": "Catopsilia pyranthe", "hebrew_name": "Mottled Emigrant", "english_name": "" },
    { "scientific_name": "Melitaea persea", "hebrew_name": "נימפית פרסית", "english_name": "" },
    { "scientific_name": "Deudorix livia", "hebrew_name": "כחליל הרימון", "english_name": "" },
    { "scientific_name": "Zegris eupheme", "hebrew_name": "כתום-קצה מדברי", "english_name": "" },
    { "scientific_name": "Polygonia egea", "hebrew_name": "נימפית משוננת", "english_name": "" },
    { "scientific_name": "Charaxes jasius", "hebrew_name": "קיסרית הקטלב", "english_name": "" },
    { "scientific_name": "Brephidium exilis", "hebrew_name": "Western Pygmy-Blue", "english_name": "" },
    { "scientific_name": "Philareta treitschkii", "hebrew_name": "פילרטה טרייטשקיי", "english_name": "" },
    { "scientific_name": "Colotis chrysonome", "hebrew_name": "דרומי המרואה", "english_name": "" }
  ],
  "שפיראים": [
    { "scientific_name": "Ischnura pumilio", "hebrew_name": "שלחית זעירה", "english_name": "Small Bluetail" },
    { "scientific_name": "Anax imperator", "hebrew_name": "חניתית היאור", "english_name": "Emperor Dragonfly" },
    { "scientific_name": "Crocothemis erythraea", "hebrew_name": "תכשיתית זוהרת", "english_name": "Broad Scarlet" },
    { "scientific_name": "Trithemis annulata", "hebrew_name": "גיחנית ארגמנית", "english_name": "Violet Dropwing" },
    { "scientific_name": "Platycnemis dealbata", "hebrew_name": "שפרירית הפלגים", "english_name": "Ivory Featherleg" },
    { "scientific_name": "Orthetrum chrysostigma", "hebrew_name": "שפירית כחולה", "english_name": "Epaulet Skimmer" },
    { "scientific_name": "Libellulidae", "hebrew_name": "שפיריתיים", "english_name": "Skimmers" },
    { "scientific_name": "Odonata", "hebrew_name": "שפיראים", "english_name": "Dragonflies" },
    { "scientific_name": "Aeshnidae", "hebrew_name": "נימפיתיים", "english_name": "Hawkers" }
  ],
  "עופות": [
    { "scientific_name": "Aves", "hebrew_name": "עופות", "english_name": "Birds" },
    { "scientific_name": "Acridotheres tristis", "hebrew_name": "מיינה הודית", "english_name": "Common Myna" },
    { "scientific_name": "Psittacula krameri", "hebrew_name": "דררה", "english_name": "Rose-ringed Parakeet" },
    { "scientific_name": "Myiopsitta monachus", "hebrew_name": "תוכי נזירי", "english_name": "Monk Parakeet" }
  ],
  "יונקים": [
    { "scientific_name": "Mammalia", "hebrew_name": "יונקים", "english_name": "Mammals" },
    { "scientific_name": "Myocastor coypus", "hebrew_name": "נוטריה", "english_name": "Coypu" },
    { "scientific_name": "Felis chaus", "hebrew_name": "חתול ביצות", "english_name": "Jungle Cat" },
    { "scientific_name": "Lutra lutra", "hebrew_name": "לוטרה", "english_name": "Eurasian Otter" }
  ],
  "חרקים אחרים": [
    { "scientific_name": "Earias insulana", "hebrew_name": "זיפית הכותנה", "english_name": "" },
    { "scientific_name": "Zeuzera pyrina", "hebrew_name": "ססעץ מנומר", "english_name": "" },
    { "scientific_name": "Oiketicoides jordana", "hebrew_name": "ססתיק פרוע", "english_name": "" },
    { "scientific_name": "Phalacropterix bruandi", "hebrew_name": "ססתיק שחור-חזה", "english_name": "" },
    { "scientific_name": "Zygaena olivieri", "hebrew_name": "ססמבריק הלבנון", "english_name": "" },
    { "scientific_name": "Zygaena graslini", "hebrew_name": "ססמבריק אדמוני", "english_name": "" },
    { "scientific_name": "Acherontia atropos", "hebrew_name": "רפרף גולגולת המת", "english_name": "" },
    { "scientific_name": "Agrius convolvuli", "hebrew_name": "רפרף החבלבל", "english_name": "" },
    { "scientific_name": "Theretra alecto", "hebrew_name": "רפרף הגפן", "english_name": "" },
    { "scientific_name": "Macroglossum stellatarum", "hebrew_name": "רפרף הדבקה", "english_name": "" },
    { "scientific_name": "Daphnis nerii", "hebrew_name": "רפרף ההרדוף", "english_name": "" },
    { "scientific_name": "Marumba quercus", "hebrew_name": "רפרף האלון", "english_name": "" },
    { "scientific_name": "Hippotion celerio", "hebrew_name": "רפרף כסוף-קו", "english_name": "" },
    { "scientific_name": "Hyles livornica", "hebrew_name": "רפרף מסורטט", "english_name": "" },
    { "scientific_name": "Phthorimaea absoluta", "hebrew_name": "עש מנהרות העגבנייה", "english_name": "" },
    { "scientific_name": "Thaumetopoea solitaria", "hebrew_name": "תהלוכן האלה", "english_name": "" },
    { "scientific_name": "Pachypasa otus", "hebrew_name": "טוואי הברוש", "english_name": "" },
    { "scientific_name": "Thaumetopoea processionea", "hebrew_name": "תהלוכן האלון", "english_name": "" },
    { "scientific_name": "Bufoidia ledereri", "hebrew_name": "טוואי אפרפר", "english_name": "" },
    { "scientific_name": "Orgyia dubia", "hebrew_name": "טוואית הארכובית", "english_name": "" },
    { "scientific_name": "Lasiocampa grandis", "hebrew_name": "טוואי גדול", "english_name": "" },
    { "scientific_name": "Amata mestralii", "hebrew_name": "ברדן בוהק", "english_name": "" },
    { "scientific_name": "Spodoptera cilium", "hebrew_name": "גדודנית הדגן", "english_name": "" },
    { "scientific_name": "Spodoptera littoralis", "hebrew_name": "גדודנית פרודניה", "english_name": "" },
    { "scientific_name": "Spodoptera exigua", "hebrew_name": "גדודנית לפיגמה", "english_name": "" },
    { "scientific_name": "Acherontia styx", "hebrew_name": "גולגולת-מת מזרחית", "english_name": "" },
    { "scientific_name": "Olepa ricini", "hebrew_name": "דובון הקיקיון", "english_name": "" },
    { "scientific_name": "Ocnogyna loewii", "hebrew_name": "דובון אביב", "english_name": "" },
    { "scientific_name": "Paidia cinerascens", "hebrew_name": "דובון אפרפר", "english_name": "" },
    { "scientific_name": "Cymbalophora oertzeni", "hebrew_name": "דובון מנומר", "english_name": "" },
    { "scientific_name": "Utetheisa pulchella", "hebrew_name": "דובון יפהפה", "english_name": "" },
    { "scientific_name": "Duponchelia fovealis", "hebrew_name": "עש הרקפת", "english_name": "" },
    { "scientific_name": "Phereoeca uterella", "hebrew_name": "עש הבית", "english_name": "" },
    { "scientific_name": "Cydia pomonella", "hebrew_name": "עש התפוח", "english_name": "" },
    { "scientific_name": "Thaumatotibia leucotreta", "hebrew_name": "עש התפוח המדומה", "english_name": "" },
    { "scientific_name": "Lobesia botrana", "hebrew_name": "עש האשכול", "english_name": "" },
    { "scientific_name": "Palpita vitrealis", "hebrew_name": "עש היסמין", "english_name": "" },
    { "scientific_name": "Ectomyelois ceratoniae", "hebrew_name": "עש החרוב", "english_name": "" },
    { "scientific_name": "Uresiphita gilvata", "hebrew_name": "עשנור הרותם", "english_name": "" },
    { "scientific_name": "Plodia interpunctella", "hebrew_name": "עש הקמח ההודי", "english_name": "" },
    { "scientific_name": "Plutella xylostella", "hebrew_name": "עשית המצליבים", "english_name": "" },
    { "scientific_name": "Chrysodeixis chalcites", "hebrew_name": "פלוסית זהובה", "english_name": "" },
    { "scientific_name": "Autographa gamma", "hebrew_name": "פלוסית גמה", "english_name": "" },
    { "scientific_name": "Cucullia calendulae", "hebrew_name": "תנשמית ציפורני חתול", "english_name": "" },
    { "scientific_name": "Acronicta rumicis", "hebrew_name": "תנשמית החומעה", "english_name": "" },
    { "scientific_name": "Catocala elocata", "hebrew_name": "תנשמית הצפצפה", "english_name": "" },
    { "scientific_name": "Olivenebula subsericata", "hebrew_name": "תנשמית העוזרר", "english_name": "" },
    { "scientific_name": "Helicoverpa armigera", "hebrew_name": "תנשמית האביב", "english_name": "" },
    { "scientific_name": "Heliothis peltigera", "hebrew_name": "תנשמית המורכבים", "english_name": "" },
    { "scientific_name": "Hypena lividalis", "hebrew_name": "תנשמית עשנורית", "english_name": "" },
    { "scientific_name": "Euchalcia paulina", "hebrew_name": "תנשמית פאולוס", "english_name": "" },
    { "scientific_name": "Episema tamardayanae", "hebrew_name": "תנשמית תמר", "english_name": "" },
    { "scientific_name": "Acronicta aceris", "hebrew_name": "תנשמית יהודה", "english_name": "" },
    { "scientific_name": "Thaumetopoea wilkinsoni", "hebrew_name": "תהלוכן האורן", "english_name": "" },
    { "scientific_name": "Saturnia pyri", "hebrew_name": "שבתאי השקד", "english_name": "" },
    { "scientific_name": "Agrotis segetum", "hebrew_name": "אגרוטיס השורשים", "english_name": "" },
    { "scientific_name": "Noctua pronuba", "hebrew_name": "אגרוטיס כתום", "english_name": "" },
    { "scientific_name": "Scopula luridata", "hebrew_name": "מודד צהוב", "english_name": "" },
    { "scientific_name": "Larentia clavaria", "hebrew_name": "מודד החלמית", "english_name": "" },
    { "scientific_name": "Proteuchloris neriaria", "hebrew_name": "מודד הבלקן", "english_name": "" },
    { "scientific_name": "Zamarada torrida", "hebrew_name": "מודד השיטים", "english_name": "" },
    { "scientific_name": "Rhodometra sacraria", "hebrew_name": "מודד הארכוביות", "english_name": "" },
    { "scientific_name": "Ascotis selenaria", "hebrew_name": "מודד האבוקדו", "english_name": "" },
    { "scientific_name": "Problepsis ocellata", "hebrew_name": "מודד עינוני", "english_name": "" },
    { "scientific_name": "Selidosema combustaria", "hebrew_name": "מודד פאולוס", "english_name": "" },
    { "scientific_name": "Apochima flabellaria", "hebrew_name": "מודד קיפודי", "english_name": "" },
    { "scientific_name": "Ctenoplusia accentifera", "hebrew_name": "קטנופלוסיה אקסנטיפרה", "english_name": "" },
    { "scientific_name": "Tathorhynchus exsiccata", "hebrew_name": "טאתורינכוס אקסיקטה", "english_name": "" },
    { "scientific_name": "Cadra cautella", "hebrew_name": "קדרה קאוטלה", "english_name": "" },
    { "scientific_name": "Phlogophora meticulosa", "hebrew_name": "פלוגופורה מטיקולוסה", "english_name": "" },
    { "scientific_name": "Agrochola lychnidis", "hebrew_name": "אגרוקולה ליכנידיס", "english_name": "" },
    { "scientific_name": "Amblyptilia acanthadactyla", "hebrew_name": "אמבליפטילייה אקנתדקטילה", "english_name": "" },
    { "scientific_name": "Loxostege sticticalis", "hebrew_name": "לוקסוסטגה סטיקטיקליס", "english_name": "" },
    { "scientific_name": "Aporophyla nigra", "hebrew_name": "אפורופילה ניגרה", "english_name": "" },
    { "scientific_name": "Garella nilotica", "hebrew_name": "גארלה נילוטיקה", "english_name": "" },
    { "scientific_name": "Cyclophora puppillaria", "hebrew_name": "ציקלופורה פופילריה", "english_name": "" },
    { "scientific_name": "Hypena obsitalis", "hebrew_name": "היפנה אובסיטליס", "english_name": "" },
    { "scientific_name": "Idaea ochrata", "hebrew_name": "אידאה אוכרטה", "english_name": "" },
    { "scientific_name": "Trichoplusia ni", "hebrew_name": "טריכופלוסיה ני", "english_name": "" },
    { "scientific_name": "Tinea pellionella", "hebrew_name": "טינאה פליונלה", "english_name": "" },
    { "scientific_name": "Atethmia centrago", "hebrew_name": "אתתמיה צנטראגו", "english_name": "" },
    { "scientific_name": "Cucullia chamomillae", "hebrew_name": "קוקוליה כממילה", "english_name": "" },
    { "scientific_name": "Bryotropha terrella", "hebrew_name": "בריוטרופה טרלה", "english_name": "" },
    { "scientific_name": "Phyllocnistis citrella", "hebrew_name": "פילוקניסטיס ציטרלה", "english_name": "" },
    { "scientific_name": "Hypsopygia costalis", "hebrew_name": "היפסופוגיה קוסטליס", "english_name": "" },
    { "scientific_name": "Gypsonoma dealbana", "hebrew_name": "גיפסונומה דיאלבנה", "english_name": "" },
    { "scientific_name": "Blastesthia tessulatana", "hebrew_name": "עשפרי הברוש", "english_name": "" },
    { "scientific_name": "Epicallia villica", "hebrew_name": "דובון החורש", "english_name": "" },
    { "scientific_name": "Agrotis trux", "hebrew_name": "אגרוטיס טרוקס", "english_name": "" },
    { "scientific_name": "Leucania putrescens", "hebrew_name": "לוקניה פוטרסנס", "english_name": "" },
    { "scientific_name": "Collita griseola", "hebrew_name": "איילמה גריסאולה", "english_name": "" },
    { "scientific_name": "Gymnoscelis rufifasciata", "hebrew_name": "גימנוסליס רופיפסיאטה", "english_name": "" },
    { "scientific_name": "Endothenia oblongana", "hebrew_name": "אנדותניה אובלונגנה", "english_name": "" },
    { "scientific_name": "Tephronia sepiaria", "hebrew_name": "טפרוניה ספיאריה", "english_name": "" },
    { "scientific_name": "Heliothis nubigera", "hebrew_name": "הליאוטיס נוביגרה", "english_name": "" },
    { "scientific_name": "Cornutiplusia circumflexa", "hebrew_name": "קורנוטיפלוסיה סירקומפלקסה", "english_name": "" },
    { "scientific_name": "Ostrinia nubilalis", "hebrew_name": "נובר התירס האירופי", "english_name": "" },
    { "scientific_name": "Tyta luctuosa", "hebrew_name": "טיטה לוקטואוסה", "english_name": "" },
    { "scientific_name": "Oegoconia quadripuncta", "hebrew_name": "אגוקוניה מרובעת", "english_name": "" },
    { "scientific_name": "Xanthorhoe fluctuata", "hebrew_name": "קסנתורה פלוקטטה", "english_name": "" },
    { "scientific_name": "Anania verbascalis", "hebrew_name": "אנניה ורבסקליס", "english_name": "" },
    { "scientific_name": "Herpetogramma licarsisalis", "hebrew_name": "הרפטוגרמה ליקרסיסליס", "english_name": "" },
    { "scientific_name": "Agrotis bigramma", "hebrew_name": "אגרוטיס ביגרמה", "english_name": "" },
    { "scientific_name": "Galleria mellonella", "hebrew_name": "עש השעווה הגדול", "english_name": "" },
    { "scientific_name": "Ophiusa tirhaca", "hebrew_name": "אופיוסה טירקא", "english_name": "" },
    { "scientific_name": "Adscita statices", "hebrew_name": "אדסקיטה סטטיקס", "english_name": "" },
    { "scientific_name": "Agrotis spinifera", "hebrew_name": "אגרוטיס ספיניפרה", "english_name": "" },
    { "scientific_name": "Agrotis catalaunensis", "hebrew_name": "אגרוטיס קטלאוננסיס", "english_name": "" },
    { "scientific_name": "Spoladea recurvalis", "hebrew_name": "ספולאדאה רקורבליס", "english_name": "" },
    { "scientific_name": "Nemophora fasciella", "hebrew_name": "נמופורה פסיאלה", "english_name": "" },
    { "scientific_name": "Pyrausta testalis", "hebrew_name": "הודברטיה טסטליס", "english_name": "" },
    { "scientific_name": "Acanthovalva inconspicuaria", "hebrew_name": "אקנתובלבה אינקונספיקואריה", "english_name": "" },
    { "scientific_name": "Agrotis ipsilon", "hebrew_name": "אגרוטיס איפסילון", "english_name": "" },
    { "scientific_name": "Pseudoterpna coronillaria", "hebrew_name": "פסאודוטרפנה קורונילריה", "english_name": "" },
    { "scientific_name": "Euplagia quadripunctaria", "hebrew_name": "יופלגיה קוואדריפונקטריה", "english_name": "" },
    { "scientific_name": "Dysgonia torrida", "hebrew_name": "דיסגוניה טוררידה", "english_name": "" },
    { "scientific_name": "Lantanophaga pusillidactylus", "hebrew_name": "לנטנופגה פוסילדקטילוס", "english_name": "" },
    { "scientific_name": "Batia lunaris", "hebrew_name": "בטיה לונריס", "english_name": "" },
    { "scientific_name": "Achroia grisella", "hebrew_name": "עש הדונג הקטן", "english_name": "" },
    { "scientific_name": "Agrotis cinerea", "hebrew_name": "אגרוטיס סינראיה", "english_name": "" },
    { "scientific_name": "Eupithecia centaureata", "hebrew_name": "אופיטסיה צנטאוראטה", "english_name": "" },
    { "scientific_name": "Cydia splendana", "hebrew_name": "צידיה ספלנדנה", "english_name": "" },
    { "scientific_name": "Pyralis farinalis", "hebrew_name": "עש הקמח", "english_name": "" },
    { "scientific_name": "Pyrausta aurata", "hebrew_name": "פיראוסטה אורטה", "english_name": "" },
    { "scientific_name": "Emmelina monodactyla", "hebrew_name": "עשנוצית החבלבל", "english_name": "" },
    { "scientific_name": "Cucullia verbasci", "hebrew_name": "תנשמית הבוצין", "english_name": "" },
    { "scientific_name": "Hellula undalis", "hebrew_name": "הלולה אונדליס", "english_name": "" },
    { "scientific_name": "Peribatodes umbraria", "hebrew_name": "פריבטודס אומברריה", "english_name": "" },
    { "scientific_name": "Achyra nudalis", "hebrew_name": "אכירה נודליס", "english_name": "" },
    { "scientific_name": "Spodoptera litura", "hebrew_name": "ספודופטרה ליטורה", "english_name": "" },
    { "scientific_name": "Hydriris ornatalis", "hebrew_name": "הידריריס אורנטליס", "english_name": "" },
    { "scientific_name": "Acontia lucida", "hebrew_name": "אקונטיה לוסידה", "english_name": "" },
    { "scientific_name": "Chloantha hyperici", "hebrew_name": "כלאונתה היפריסי", "english_name": "" },
    { "scientific_name": "Anarsia lineatella", "hebrew_name": "אנרסיה ליניאטלה", "english_name": "" },
    { "scientific_name": "Eublemma cochylioides", "hebrew_name": "אובלמה קוכילואידס", "english_name": "" },
    { "scientific_name": "Pechipogo plumigeralis", "hebrew_name": "Plumed Fan-foot", "english_name": "" },
    { "scientific_name": "Idaea degeneraria", "hebrew_name": "Portland Ribbon Wave", "english_name": "" },
    { "scientific_name": "Phragmataecia castaneae", "hebrew_name": "ססעץ הקנים", "english_name": "" },
    { "scientific_name": "Isturgia exerraria", "hebrew_name": "איסטורגיה אקסרריה", "english_name": "" },
    { "scientific_name": "Endotricha flammealis", "hebrew_name": "אנדוטריכה פלממליס", "english_name": "" },
    { "scientific_name": "Oncocera semirubella", "hebrew_name": "אונקוצרה סמירובלה", "english_name": "" },
    { "scientific_name": "Phragmatobia fuliginosa", "hebrew_name": "פרגמטובייה פוליגינוזה", "english_name": "" },
    { "scientific_name": "Nomophila noctuella", "hebrew_name": "נומופילה נוקטואלה", "english_name": "" },
    { "scientific_name": "Udea ferrugalis", "hebrew_name": "אודאה פרוגינליס", "english_name": "" },
    { "scientific_name": "Idaea inquinata", "hebrew_name": "אידאה אינקווינאטה", "english_name": "" },
    { "scientific_name": "Idaea subsericeata", "hebrew_name": "אידאה סובסריקטטה", "english_name": "" },
    { "scientific_name": "Pyrausta sanguinalis", "hebrew_name": "פיראוסטה סנגווינליס", "english_name": "" },
    { "scientific_name": "Antigastra catalaunalis", "hebrew_name": "אנטיגסטרה קטלאונליס", "english_name": "" },
    { "scientific_name": "Agrotis puta", "hebrew_name": "אגרוטיס פוטה", "english_name": "" },
    { "scientific_name": "Thysanoplusia orichalcea", "hebrew_name": "טיסנופלוסיה אוריכלקאה", "english_name": "" },
    { "scientific_name": "Scopula imitaria", "hebrew_name": "סקופולה אימיטריה", "english_name": "" },
    { "scientific_name": "Eublemma parva", "hebrew_name": "אובלמה קטנה", "english_name": "" },
    { "scientific_name": "Agrotis herzogi", "hebrew_name": "אגרוטיס הרצוגי", "english_name": "" },
    { "scientific_name": "Earias biplaga", "hebrew_name": "איאריס ביפלגה", "english_name": "" },
    { "scientific_name": "Lymantria dispar", "hebrew_name": "טוואית האלון", "english_name": "" },
    { "scientific_name": "Acontia trabealis", "hebrew_name": "אקונטיה טרבאליס", "english_name": "" },
    { "scientific_name": "Phyllonorycter blancardella", "hebrew_name": "פילונוריקטר בלנקארדלה", "english_name": "" },
    { "scientific_name": "Xestia xanthographa", "hebrew_name": "קססטיה קסנתוגרפה", "english_name": "" },
    { "scientific_name": "Cynaeda dentalis", "hebrew_name": "צינאדה דנטליס", "english_name": "" },
    { "scientific_name": "Aglossa caprealis", "hebrew_name": "אגלוסה קפריאליס", "english_name": "" },
    { "scientific_name": "Vittaplusia vittata", "hebrew_name": "ויטאפלוסיה ויטאטה", "english_name": "" },
    { "scientific_name": "Esperia sulphurella", "hebrew_name": "אספריה סולפורלה", "english_name": "" },
    { "scientific_name": "Chiasmia aestimaria", "hebrew_name": "כיאסמיה אסטימריה", "english_name": "" },
    { "scientific_name": "Eutelia adulatrix", "hebrew_name": "אאוטליה אדולטריקס", "english_name": "" },
    { "scientific_name": "Leucania loreyi", "hebrew_name": "לוקניה לוריי", "english_name": "" },
    { "scientific_name": "Dysgonia algira", "hebrew_name": "דיסגוניה אלגירה", "english_name": "" },
    { "scientific_name": "Lamoria anella", "hebrew_name": "עשנור התפוח", "english_name": "" },
    { "scientific_name": "Myelois circumvoluta", "hebrew_name": "מיילואיס סירקומבולוטה", "english_name": "" },
    { "scientific_name": "Pyralis manihotalis", "hebrew_name": "פירליס מניהוטליס", "english_name": "" },
    { "scientific_name": "Grammodes bifasciata", "hebrew_name": "גרמוודס ביפסיאטה", "english_name": "" },
    { "scientific_name": "Pseudozarba bipartita", "hebrew_name": "פסאודוזרבה ביפרטיטה", "english_name": "" },
    { "scientific_name": "Synclera traducalis", "hebrew_name": "סינקלרה טרדוקליס", "english_name": "" },
    { "scientific_name": "Ethmia bipunctella", "hebrew_name": "אתמיה ביפונקטלה", "english_name": "" },
    { "scientific_name": "Mythimna unipuncta", "hebrew_name": "מיתימנה יוניפונקטה", "english_name": "" },
    { "scientific_name": "Peribatodes rhomboidaria", "hebrew_name": "פריבטודס רומבוידריה", "english_name": "" },
    { "scientific_name": "Aspitates ochrearia", "hebrew_name": "אספיטטס אוקרריה", "english_name": "" },
    { "scientific_name": "Achlya flavicornis", "hebrew_name": "אכליה פלביקורניס", "english_name": "" },
    { "scientific_name": "Evergestis isatidalis", "hebrew_name": "אברגסטיס איסאטידליס", "english_name": "" },
    { "scientific_name": "Aglossa aglossalis", "hebrew_name": "אגלוסה אגלוסליס", "english_name": "" },
    { "scientific_name": "Agrotis pierreti", "hebrew_name": "אגרוטיס פיירטי", "english_name": "" },
    { "scientific_name": "Agriphila beieri", "hebrew_name": "אגריפילה ביירי", "english_name": "" },
    { "scientific_name": "Eublemma siticuosa", "hebrew_name": "אובלמה אלבינה", "english_name": "" },
    { "scientific_name": "Odites kollarella", "hebrew_name": "אודיטס קולרלה", "english_name": "" },
    { "scientific_name": "Euzophera osseatella", "hebrew_name": "אוזופרה אוסאטלה", "english_name": "" },
    { "scientific_name": "Euzophera lunulella", "hebrew_name": "אוזופרה לונוללה", "english_name": "" },
    { "scientific_name": "Oiketicoides lutea", "hebrew_name": "ססתיק צהוב", "english_name": "" },
    { "scientific_name": "Euchromius bella", "hebrew_name": "אוכרומיוס בלה", "english_name": "" },
    { "scientific_name": "Euchromius superbella", "hebrew_name": "אוכרומיוס סופרבלוס", "english_name": "" },
    { "scientific_name": "Euchromius cambridgei", "hebrew_name": "אאוכרומיוס קמברידג`אי", "english_name": "" },
    { "scientific_name": "Euchromius ramburiellus", "hebrew_name": "אוכרומיוס רמבוריאלוס", "english_name": "" },
    { "scientific_name": "Eumannia fumosata", "hebrew_name": "אומניה פומוסטה", "english_name": "" },
    { "scientific_name": "Eumera turcosyrica", "hebrew_name": "אומרה טורקוסוריקה", "english_name": "" },
    { "scientific_name": "Usgentia vespertalis", "hebrew_name": "אוסגנטיה וספרטליס", "english_name": "" },
    { "scientific_name": "Eupithecia extremata", "hebrew_name": "אופיטסיה אקסטרמטה", "english_name": "" },
    { "scientific_name": "Eupithecia syriacata", "hebrew_name": "אופיטסיה סיריאקטה", "english_name": "" },
    { "scientific_name": "Earias syriacana", "hebrew_name": "איאריס סיריאקנה", "english_name": "" },
    { "scientific_name": "Idaea intermedia", "hebrew_name": "אידאה אינטרמדיה", "english_name": "" },
    { "scientific_name": "Idaea infirmaria", "hebrew_name": "אידאה אינפרמריה", "english_name": "" },
    { "scientific_name": "Idaea inclinata", "hebrew_name": "אידאה אינקלינטה", "english_name": "" },
    { "scientific_name": "Idaea affinitata", "hebrew_name": "אידאה אפיניטטה", "english_name": "" },
    { "scientific_name": "Idaea distinctaria", "hebrew_name": "אידאה דיסטינקטריה", "english_name": "" },
    { "scientific_name": "Idaea longaria", "hebrew_name": "אידאה לונגריה", "english_name": "" },
    { "scientific_name": "Idaea palaestinensis", "hebrew_name": "אידאה פלשתינאית", "english_name": "" },
    { "scientific_name": "Idaea consanguinaria", "hebrew_name": "אידאה קונסנגווינריה", "english_name": "" },
    { "scientific_name": "Muscula muscula", "hebrew_name": "איילמה מוסקולה", "english_name": "" },
    { "scientific_name": "Isturgia berytaria", "hebrew_name": "איסטורגיה בריטריה", "english_name": "" },
    { "scientific_name": "Isturgia disputaria", "hebrew_name": "איסטורגיה דיספוטריה", "english_name": "" },
    { "scientific_name": "Albarracina warionis", "hebrew_name": "טוואית השרביטן", "english_name": "" },
    { "scientific_name": "Alophia combustella", "hebrew_name": "אלופיה קומבוסטלה", "english_name": "" },
    { "scientific_name": "Ematheudes punctellus", "hebrew_name": "אמאתאודס פונקטלה", "english_name": "" },
    { "scientific_name": "Amblypalpis olivierella", "hebrew_name": "עשבחנין הכישור", "english_name": "" },
    { "scientific_name": "Amicta quadrangularis", "hebrew_name": "ססתיק מרובע", "english_name": "" },
    { "scientific_name": "Ancylosis convexella", "hebrew_name": "אנצילוזיס קונבקסה", "english_name": "" },
    { "scientific_name": "Ancylolomia palpella", "hebrew_name": "אנצילולומיה פלפלה", "english_name": "" },
    { "scientific_name": "Ancylolomia pectinatella", "hebrew_name": "אנצילולומיה פקטינטלוס", "english_name": "" },
    { "scientific_name": "Acidaliastis micra", "hebrew_name": "אסידאליאסטיס מיקרה", "english_name": "" },
    { "scientific_name": "Arenipses sabella", "hebrew_name": "אפומיה סבלה", "english_name": "" },
    { "scientific_name": "Aporodes floralis", "hebrew_name": "אפורודס פלורליס", "english_name": "" },
    { "scientific_name": "Aporophyla canescens", "hebrew_name": "אפורופילה קנסנס", "english_name": "" },
    { "scientific_name": "Episema glaucina", "hebrew_name": "אפיסמה גלאוסינה", "english_name": "" },
    { "scientific_name": "Epicallima icterinella", "hebrew_name": "אפיקלימה איקטרינלה", "english_name": "" },
    { "scientific_name": "Acrobasis glaucella", "hebrew_name": "אקרובסיס פלואלה", "english_name": "" },
    { "scientific_name": "Acrobasis romanella", "hebrew_name": "אקרובסיס רומנלה", "english_name": "" },
    { "scientific_name": "Acronicta pasiphae", "hebrew_name": "אקרוניקטה פסיפאה", "english_name": "" },
    { "scientific_name": "Atethmia ambusta", "hebrew_name": "אתתמיה אמבוסטה", "english_name": "" },
    { "scientific_name": "Boursinia discordans", "hebrew_name": "בורסיניה דיסקורדנס", "english_name": "" },
    { "scientific_name": "Bifascioides leucomelanella", "hebrew_name": "ביפסקיואידס לאוקומלנלה", "english_name": "" },
    { "scientific_name": "Bembecia stiziformis", "hebrew_name": "במבציה סטיזיפורמיס", "english_name": "" },
    { "scientific_name": "Bryophila tephrocharis", "hebrew_name": "בריופילה טפרוכאריס", "english_name": "" },
    { "scientific_name": "Bryophila rectilinea", "hebrew_name": "בריופילה רקטילינאה", "english_name": "" },
    { "scientific_name": "Brachyglossina purpureomarginata", "hebrew_name": "ברכיגלוסינה פורפוראומארגינטה", "english_name": "" },
    { "scientific_name": "Grammodes boisdeffrii", "hebrew_name": "גרמוודס בואסדפרי", "english_name": "" },
    { "scientific_name": "Dolicharthria bruguieralis", "hebrew_name": "דוליכארתריה ברוגייראליס", "english_name": "" },
    { "scientific_name": "Dolicharthria daralis", "hebrew_name": "דוליכארתריה דארליס", "english_name": "" },
    { "scientific_name": "Dattinia guttosalis", "hebrew_name": "דטיניה גוטוזליס", "english_name": "" },
    { "scientific_name": "Dysauxes punctata", "hebrew_name": "דיסאוקסס פמולה", "english_name": "" },
    { "scientific_name": "Gnophos sartata", "hebrew_name": "מודד אפלולי", "english_name": "" },
    { "scientific_name": "Dasycorsa modesta", "hebrew_name": "דסיקורסה מודסטה", "english_name": "" },
    { "scientific_name": "Hypotia corticalis", "hebrew_name": "היפוטיה קורטיקליס", "english_name": "" },
    { "scientific_name": "Watsonalla uncinula", "hebrew_name": "ווטסונלה אוניקולה", "english_name": "" },
    { "scientific_name": "Zebeeba falsalis", "hebrew_name": "זבבה פלסאליס", "english_name": "" },
    { "scientific_name": "Zygaena brizae", "hebrew_name": "זיגנה בריזאה", "english_name": "" },
    { "scientific_name": "Zekelita ravalis", "hebrew_name": "זקליטה רבליס", "english_name": "" },
    { "scientific_name": "Zethes insularis", "hebrew_name": "זתס אינסולריס", "english_name": "" },
    { "scientific_name": "Tegostoma baphialis", "hebrew_name": "טגוסטומה בפילס", "english_name": "" },
    { "scientific_name": "Teinoptera gafsana", "hebrew_name": "טיינופטרה גפסנה", "english_name": "" },
    { "scientific_name": "Trichophaga bipartitella", "hebrew_name": "טריכופגה ביפרטיטלה", "english_name": "" },
    { "scientific_name": "Euproctis fasciata", "hebrew_name": "יופרוקטיס סוזנה", "english_name": "" },
    { "scientific_name": "Choreutis aegyptiaca", "hebrew_name": "כוראוטיס אגיפטיאקה", "english_name": "" },
    { "scientific_name": "Choreutis sexfasciella", "hebrew_name": "כוראוטיס סקספסיאלה", "english_name": "" },
    { "scientific_name": "Chamaesphecia chalciformis", "hebrew_name": "כמספציה חלקיפורמיס", "english_name": "" },
    { "scientific_name": "Chamaesphecia masariformis", "hebrew_name": "כמספציה מסריפורמיס", "english_name": "" },
    { "scientific_name": "Charissa subtaurica", "hebrew_name": "כריסה סובטאוריקה", "english_name": "" },
    { "scientific_name": "Leucochlaena jordana", "hebrew_name": "לאוקוכלאנה ירדנית", "english_name": "" },
    { "scientific_name": "Leucochlaena muscosa", "hebrew_name": "לאוקוכלאנה מוסקוסה", "english_name": "" },
    { "scientific_name": "Loryma egregialis", "hebrew_name": "Pied Tabby", "english_name": "" },
    { "scientific_name": "Lithostege palaestinensis", "hebrew_name": "ליתוסטגה פלשתינאית", "english_name": "" },
    { "scientific_name": "Lithophane lapidea", "hebrew_name": "ליתופנה לפידאה", "english_name": "" },
    { "scientific_name": "Lasiocampa josua", "hebrew_name": "טוואי יהושע", "english_name": "" },
    { "scientific_name": "Lasiocampa terreni", "hebrew_name": "לסיאוקמפה טרני", "english_name": "" },
    { "scientific_name": "Meganola togatulalis", "hebrew_name": "מגנולה טוגטולליס", "english_name": "" },
    { "scientific_name": "Metachrostis velox", "hebrew_name": "מטאכרוסטיס וולוקס", "english_name": "" },
    { "scientific_name": "Metasia rosealis", "hebrew_name": "מטאסיה רוזאליס", "english_name": "" },
    { "scientific_name": "Mattia callidaria", "hebrew_name": "מטיאה קלידריה", "english_name": "" },
    { "scientific_name": "Microloxia herbaria", "hebrew_name": "מיקרולוקסיה הרבריה", "english_name": "" },
    { "scientific_name": "Micronola wadicola", "hebrew_name": "מיקרונולה ואדיקולה", "english_name": "" },
    { "scientific_name": "Micropterix elegans", "hebrew_name": "מיקרופטריקס אלגנס", "english_name": "" },
    { "scientific_name": "Micropterix berytella", "hebrew_name": "מיקרופטריקס בריטלה", "english_name": "" },
    { "scientific_name": "Mythimna languida", "hebrew_name": "מיתימנה לנגווידה", "english_name": "" },
    { "scientific_name": "Mesophleps corsicella", "hebrew_name": "מסופלפס קורסיקלה", "english_name": "" },
    { "scientific_name": "Merulempista turturella", "hebrew_name": "מרולמפיסטה טורטורלה", "english_name": "" },
    { "scientific_name": "Nola infantula", "hebrew_name": "נולה אינפנטולה", "english_name": "" },
    { "scientific_name": "Neromia pulvereisparsa", "hebrew_name": "נרומיה פולוורייזפרסה", "english_name": "" },
    { "scientific_name": "Sazonia fenusaeformis", "hebrew_name": "סזוניה פנוסאפורמיס", "english_name": "" },
    { "scientific_name": "Stathmopoda auriferella", "hebrew_name": "סטאתמופודה אוריפרלה", "english_name": "" },
    { "scientific_name": "Stilbina hypaenides", "hebrew_name": "סטילבינה היפנידס", "english_name": "" },
    { "scientific_name": "Cybalomia pentadalis", "hebrew_name": "סיבלומיה פנטדליס", "english_name": "" },
    { "scientific_name": "Symmoca signatella", "hebrew_name": "סימוקה סיגנטלה", "english_name": "" },
    { "scientific_name": "Synanthedon stomoxiformis", "hebrew_name": "סיננתדון סטומקסיפורמיס", "english_name": "" },
    { "scientific_name": "Synaphe morbidalis", "hebrew_name": "סינפה מורבידליס", "english_name": "" },
    { "scientific_name": "Scopula minorata", "hebrew_name": "סקופולה מינורטה", "english_name": "" },
    { "scientific_name": "Scythris flabella", "hebrew_name": "סקיתריס פלבלה", "english_name": "" },
    { "scientific_name": "Chlorissa etruscaria", "hebrew_name": "פאיוגרמה אטרוסקריה", "english_name": "" },
    { "scientific_name": "Phaiogramma faustinata", "hebrew_name": "פאיוגרמה פאוסטנטה", "english_name": "" },
    { "scientific_name": "Phaselia deliciosaria", "hebrew_name": "פאסליה דליסיוסריה", "english_name": "" },
    { "scientific_name": "Polymixis ivanchiki", "hebrew_name": "פולימיקסיס איוונטשיקי", "english_name": "" },
    { "scientific_name": "Polymixis trisignata", "hebrew_name": "פולימיקסיס טריסיגנטה", "english_name": "" },
    { "scientific_name": "Polymixis serpentina", "hebrew_name": "פולימיקסיס סרפנטינה", "english_name": "" },
    { "scientific_name": "Furcula interrupta", "hebrew_name": "דו זיפן הצפצפה", "english_name": "" },
    { "scientific_name": "Pterophorus ischnodactyla", "hebrew_name": "פטרופורוס אישנודקטילוס", "english_name": "" },
    { "scientific_name": "Pyroderces argyrogrammos", "hebrew_name": "פירודרסס ארגירוגרמוס", "english_name": "" },
    { "scientific_name": "Pyropteron jordanicum", "hebrew_name": "פירופטרון ירדני", "english_name": "" },
    { "scientific_name": "Pelochrista labyrinthicana", "hebrew_name": "פלוכריסטה לבירינטיקנה", "english_name": "" },
    { "scientific_name": "Palumbina guerinii", "hebrew_name": "פלומבינה גריני", "english_name": "" },
    { "scientific_name": "Phalonidia contractana", "hebrew_name": "פלונידיה קונטרקטנה", "english_name": "" },
    { "scientific_name": "Plecoptera reflexa", "hebrew_name": "פלקופטרה רפלקסה", "english_name": "" },
    { "scientific_name": "Psorosa tergestella", "hebrew_name": "פסאודואקרובסיס טרסגסטלה", "english_name": "" },
    { "scientific_name": "Pseudopanthera syriacata", "hebrew_name": "פסאודופנתרה סיריאקטה", "english_name": "" },
    { "scientific_name": "Pseudenargia deleta", "hebrew_name": "פסאודנרגיה דלטה", "english_name": "" },
    { "scientific_name": "Pericyma albidentaria", "hebrew_name": "פריסימה אלבידנטריה", "english_name": "" },
    { "scientific_name": "Pericyma squalens", "hebrew_name": "פריסימה סקוואלנס", "english_name": "" },
    { "scientific_name": "Parapoynx affinialis", "hebrew_name": "פרפוינקס אפיניאליס", "english_name": "" },
    { "scientific_name": "Cerocala sana", "hebrew_name": "צרוקלה סנה", "english_name": "" },
    { "scientific_name": "Cornifrons ulceratalis", "hebrew_name": "קורניפרונס אולצרטליס", "english_name": "" },
    { "scientific_name": "Catocala eutychea", "hebrew_name": "קטוקלה אוטיכאה", "english_name": "" },
    { "scientific_name": "Catarhoe hortulanaria", "hebrew_name": "קטרואה הורטולנריה", "english_name": "" },
    { "scientific_name": "Catarhoe mosulensis", "hebrew_name": "קטרואה מוסולנסיס", "english_name": "" },
    { "scientific_name": "Cleonymia chabordis", "hebrew_name": "קלאונימיה חבורדיס", "english_name": "" },
    { "scientific_name": "Clytie infrequens", "hebrew_name": "קליטיה אינפרקוונס", "english_name": "" },
    { "scientific_name": "Clytie syriaca", "hebrew_name": "קליטיה סוריאקה", "english_name": "" },
    { "scientific_name": "Clepsis burgasiensis", "hebrew_name": "קלפסיס בורגסיאנסס", "english_name": "" },
    { "scientific_name": "Nebula salicata", "hebrew_name": "קנוטפריה אבולוטריה", "english_name": "" },
    { "scientific_name": "Casama innotata", "hebrew_name": "טוואית הינבוט", "english_name": "" },
    { "scientific_name": "Xestia palaestinensis", "hebrew_name": "קססטיה פלשתינאית", "english_name": "" },
    { "scientific_name": "Crocallis tusciaria", "hebrew_name": "קרוקליס טוסקיאריה", "english_name": "" },
    { "scientific_name": "Cryptoblabes gnidiella", "hebrew_name": "קריפטובלבאס גנידיאלה", "english_name": "" },
    { "scientific_name": "Rhabdophera arefacta", "hebrew_name": "רבדוסטרופיה ארפקטה", "english_name": "" },
    { "scientific_name": "Rhodostrophia tabidaria", "hebrew_name": "רודוסטרופיה דיסקופונקטטה", "english_name": "" },
    { "scientific_name": "Reisserita latiusculella", "hebrew_name": "רייזרריטה לטיוסקוללה", "english_name": "" },
    { "scientific_name": "Theresimima ampellophaga", "hebrew_name": "תרסימימה אמפלופגה", "english_name": "" }
  ]
};
const speciesMap = Object.entries(rawSpeciesMap).flatMap(
  ([category, entries]) => entries.map((entry) => ({
    Scientific_Name: entry.scientific_name,
    Category: category,
    Hebrew_Name: entry.hebrew_name,
    English_Name: entry.english_name
  }))
);
const SPECIES_REGISTRY = {
  // Invasive species
  "Papilio demoleus": "invasive",
  "Myocastor coypus": "invasive",
  "Acridotheres tristis": "invasive",
  "Psittacula krameri": "invasive",
  "Myiopsitta monachus": "invasive",
  // Rare species
  "Borbo borbonica": "rare",
  "Crocothemis erythraea": "rare",
  "Felis chaus": "rare",
  "Lutra lutra": "rare",
  "Ischnura pumilio": "rare",
  "Anax imperator": "rare"
};
function classifySpecies(scientificName) {
  const normalized = scientificName.trim().toLowerCase();
  for (const [name, status] of Object.entries(SPECIES_REGISTRY)) {
    if (name.toLowerCase() === normalized) {
      return status;
    }
  }
  return "other";
}
const GROUP_TRANSLATIONS = {
  "ציבור רחב": { he: "ציבור רחב", en: "General Public" },
  "תלמידים": { he: "תלמידים", en: "Students" },
  "סטודנטים": { he: "תלמידים", en: "Students" },
  "קהילה": { he: "קהילת המדע האזרחי", en: "Citizen science community" },
  "student": { he: "תלמידים", en: "Students" },
  "community": { he: "קהילת המדע האזרחי", en: "Citizen science community" },
  "מומחים": { he: "מומחים", en: "Experts" },
  "experts": { he: "מומחים", en: "Experts" },
  "professional": { he: "אנשי מקצוע", en: "Professionals" }
};
const TAXA_TRANSLATIONS = {
  "עופות": { he: "עופות", en: "Birds" },
  "פרפרים": { he: "פרפרים", en: "Butterflies" },
  "שפיראים": { he: "שפיראים", en: "Dragonflies" },
  "יונקים": { he: "יונקים", en: "Mammals" },
  "שאר המינים": { he: "שאר המינים", en: "Other Species" }
};
const MONTH_TRANSLATIONS = {
  1: { he: "ינואר", en: "Jan" },
  2: { he: "פברואר", en: "Feb" },
  3: { he: "מרץ", en: "Mar" },
  4: { he: "אפריל", en: "Apr" },
  5: { he: "מאי", en: "May" },
  6: { he: "יוני", en: "Jun" },
  7: { he: "יולי", en: "Jul" },
  8: { he: "אוגוסט", en: "Aug" },
  9: { he: "ספטמבר", en: "Sep" },
  10: { he: "אוקטובר", en: "Oct" },
  11: { he: "נובמבר", en: "Nov" },
  12: { he: "דצמבר", en: "Dec" }
};
function translateGroupName(group, lang = "he") {
  const translation = GROUP_TRANSLATIONS[group];
  if (translation) {
    return translation[lang];
  }
  return group;
}
function translateTaxa(taxa, lang = "he") {
  const translation = TAXA_TRANSLATIONS[taxa];
  if (translation) {
    return translation[lang];
  }
  return taxa;
}
function translateMonth(monthNum, lang = "he") {
  const translation = MONTH_TRANSLATIONS[monthNum];
  if (translation) {
    return translation[lang];
  }
  return monthNum.toString();
}
const TAXA_GROUP_KEYS = [
  "birds",
  "butterflies",
  "dragonflies",
  "mammals",
  "other"
];
const INVASIVE_SPECIES = [
  { he: "זנב סנונית הלימון", sci: "Papilio demoleus", tab: "פרפרים" },
  { he: "נוטרייה", sci: "Myocastor coypus", tab: "יונקים" },
  { he: "מיינה מצויה", sci: "Acridotheres tristis", tab: "עופות" },
  { he: "דררה מצויה", sci: "Psittacula krameri", tab: "עופות" },
  { he: "תוכי נזירי", sci: "Myiopsitta monachus", tab: "עופות" }
];
const RARE_SPECIES = [
  { he: "הספרית ביצות", sci: "Borbo borbonica", tab: "פרפרים" },
  { he: "חתול ביצות", sci: "Felis chaus", tab: "יונקים" },
  { he: "לוטרה", sci: "Lutra lutra", tab: "יונקים" },
  { he: "שלחית זעירה", sci: "Crocothemis erythraea", tab: "שפיראים" },
  { he: "חניתית היאור", sci: "Orthetrum chrysostigma", tab: "שפיראים" },
  { he: "תכשיטית זוהרת", sci: "Calopteryx syriaca", tab: "שפיראים" }
];
const TAB_LABEL_TO_GROUP = {
  "עופות": "birds",
  "פרפרים": "butterflies",
  "שפיראים": "dragonflies",
  "יונקים": "mammals",
  "שאר המינים": "other"
};
new Map(
  INVASIVE_SPECIES.map((s) => [s.sci, TAB_LABEL_TO_GROUP[s.tab] ?? "other"])
);
new Map(
  RARE_SPECIES.map((s) => [s.sci, TAB_LABEL_TO_GROUP[s.tab] ?? "other"])
);
const _speciesMapCategoryBySci = new Map(
  speciesMap.map((entry) => [entry.Scientific_Name, entry.Category])
);
function getTaxaGroup(o) {
  const sci = o.scientific_name;
  if (sci) {
    const category = _speciesMapCategoryBySci.get(sci);
    if (category) {
      return TAB_LABEL_TO_GROUP[category] ?? "other";
    }
  }
  const iconic = o.iconic_taxon_name;
  if (iconic === "Aves") return "birds";
  if (iconic === "Mammalia") return "mammals";
  return "other";
}
function getSpeciesClassification(o) {
  const status = classifySpecies(o.scientific_name);
  return status === "other" ? "other_species" : status;
}
const ObservationsCtx = reactExports.createContext(null);
function ObservationsProvider({ children }) {
  const [observations, setObservations] = reactExports.useState([]);
  const [filters, setFilters] = reactExports.useState({
    time: /* @__PURE__ */ new Map(),
    taxa: /* @__PURE__ */ new Set(["birds", "butterflies", "dragonflies", "mammals", "other"]),
    groups: /* @__PURE__ */ new Set(),
    researchOnly: false,
    areas: /* @__PURE__ */ new Set(),
    speciesTypes: /* @__PURE__ */ new Set(),
    dateRange: null
  });
  const [datasetBounds, setDatasetBounds] = reactExports.useState(null);
  const [deepDive, setDeepDive] = reactExports.useState({
    category: null,
    species: /* @__PURE__ */ new Set(),
    search: ""
  });
  const toggleSpeciesType = reactExports.useCallback((type) => {
    setFilters((prev) => {
      const next = new Set(prev.speciesTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, speciesTypes: next };
    });
  }, []);
  const setDateRange = reactExports.useCallback((start, end) => {
    setFilters((prev) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const nextTime = /* @__PURE__ */ new Map();
      for (let y = startYear; y <= endYear; y++) {
        nextTime.set(String(y), /* @__PURE__ */ new Set());
      }
      return { ...prev, dateRange: { start, end }, time: nextTime };
    });
  }, []);
  const deepDiveActions = reactExports.useMemo(() => ({
    setDeepDiveCategory: (category) => setDeepDive({ category, species: /* @__PURE__ */ new Set(), search: "" }),
    toggleDeepDiveSpecies: (scientificName) => setDeepDive((prev) => {
      const next = new Set(prev.species);
      if (next.has(scientificName)) next.delete(scientificName);
      else next.add(scientificName);
      return { ...prev, species: next };
    }),
    clearDeepDiveSpecies: () => setDeepDive((prev) => ({ ...prev, species: /* @__PURE__ */ new Set() })),
    setDeepDiveSearch: (query) => setDeepDive((prev) => ({ ...prev, search: query }))
  }), []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const loadData = async () => {
      try {
        const userGroupsResponse = await fetch("/user_groups.csv");
        const userGroupsText = await userGroupsResponse.text();
        const userGroupsData = Papa.parse(userGroupsText, {
          header: true,
          skipEmptyLines: true
        }).data;
        const userGroupMap = new Map(
          userGroupsData.map((row) => [row.user_login, row.group])
        );
        const observationsResponse = await fetch("/Tzipori_2325.csv");
        const observationsText = await observationsResponse.text();
        const observationsData = Papa.parse(observationsText, {
          header: true,
          skipEmptyLines: true
        }).data;
        const joinedObservations = observationsData.map((row) => {
          const lat = parseFloat((row.latitude || "").trim());
          const lon = parseFloat((row.longitude || "").trim());
          const observedOn = (row.observed_on || "").trim();
          if (!observedOn || isNaN(lat) || isNaN(lon)) return null;
          const userLogin = (row.user_login || "").trim();
          const userCategory = userGroupMap.get(userLogin) || "ציבור רחב";
          const observation = {
            observed_on: observedOn,
            latitude: lat,
            longitude: lon,
            user_login: userLogin,
            quality_grade: (row.quality_grade || "").trim().toLowerCase(),
            iconic_taxon_name: (row.iconic_taxon_name || "").trim(),
            scientific_name: (row.scientific_name || "").trim(),
            taxon_order_name: (row.taxon_order_name || "").trim(),
            user_category: userCategory,
            establishment_means: (row.establishment_means || "").trim().toLowerCase() || void 0
          };
          return observation;
        }).filter((obs) => obs !== null);
        setObservations(joinedObservations);
        let minTs = Infinity;
        let maxTs = -Infinity;
        const yearsInData = /* @__PURE__ */ new Set();
        for (const obs of joinedObservations) {
          const d = obs.observed_on;
          if (!d || d.length < 10) continue;
          const parts = d.split("/");
          if (parts.length !== 3) continue;
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          if (isNaN(day) || isNaN(month) || isNaN(year)) continue;
          const ts = new Date(year, month, day).getTime();
          if (ts < minTs) minTs = ts;
          if (ts > maxTs) maxTs = ts;
          yearsInData.add(parts[2]);
        }
        if (minTs !== Infinity) {
          const startYear = new Date(minTs).getFullYear();
          const endYear = new Date(maxTs).getFullYear();
          const boundsStart = new Date(startYear, 0, 1).getTime();
          const boundsEnd = new Date(endYear, 11, 31, 23, 59, 59, 999).getTime();
          setDatasetBounds({ start: boundsStart, end: boundsEnd });
          const defaultTime = /* @__PURE__ */ new Map();
          for (const y of yearsInData) {
            defaultTime.set(y, /* @__PURE__ */ new Set());
          }
          setFilters((prev) => ({
            ...prev,
            time: defaultTime,
            dateRange: { start: boundsStart, end: boundsEnd }
          }));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);
  const value = reactExports.useMemo(
    () => ({ observations, setObservations, filters, setFilters, toggleSpeciesType, setDateRange, datasetBounds, deepDive, deepDiveActions }),
    [observations, filters, toggleSpeciesType, setDateRange, datasetBounds, deepDive, deepDiveActions]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationsCtx.Provider, { value, children });
}
function useObservations() {
  const c = reactExports.useContext(ObservationsCtx);
  if (!c) throw new Error("useObservations must be used within ObservationsProvider");
  return c;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const SURVEY_AREA_KEYS = ["תעלה", "פשט קטן", "נחל", "פשט גדול", "other_areas"];
const AREA_TRANSLATIONS = {
  "תעלה": { he: "תעלה", en: "Canal" },
  "פשט קטן": { he: "פשט קטן", en: "Small Floodplain" },
  "נחל": { he: "נחל", en: "Stream" },
  "פשט גדול": { he: "פשט גדול", en: "Large Floodplain" },
  "other_areas": { he: "שאר האזורים", en: "Other Areas" }
};
const AREA_COLORS = {
  "תעלה": "#0ea5e9",
  "פשט קטן": "#22c55e",
  "נחל": "#eab308",
  "פשט גדול": "#ec4899",
  "other_areas": "#9ca3af"
};
function translateArea(key, lang) {
  return AREA_TRANSLATIONS[key][lang];
}
const SURVEY_POLYGONS = {
  "תעלה": [
    [
      [35.1198506, 32.7772126],
      [35.1193008, 32.7777847],
      [35.1192978, 32.7777878],
      [35.1193004, 32.7777884],
      [35.1193384, 32.7777976],
      [35.1214673, 32.7783094],
      [35.1223868, 32.7786406],
      [35.1226808, 32.7782606],
      [35.1198551, 32.7772079],
      [35.1198506, 32.7772126]
    ]
  ],
  "פשט קטן": [
    [
      [35.1193175, 32.777771],
      [35.1198311, 32.7772296],
      [35.1189496, 32.7768498],
      [35.1183488, 32.7765176],
      [35.1182763, 32.7768629],
      [35.1184281, 32.7773844],
      [35.1187164, 32.7776826],
      [35.1193175, 32.777771]
    ]
  ],
  "נחל": [
    [
      [35.1182442, 32.7768764],
      [35.1183888, 32.7765244],
      [35.1171792, 32.7757312],
      [35.1153845, 32.7748225],
      [35.1139664, 32.7740698],
      [35.1129246, 32.7738659],
      [35.1129242, 32.7741774],
      [35.1136775, 32.7743811],
      [35.1146469, 32.7749777],
      [35.1157685, 32.7755338],
      [35.1166419, 32.7759543],
      [35.1182442, 32.7768764]
    ]
  ],
  "פשט גדול": [
    [
      [35.1128922, 32.7742045],
      [35.1129486, 32.7738998],
      [35.1120043, 32.7736756],
      [35.1106008, 32.7730515],
      [35.1093268, 32.7725562],
      [35.1087982, 32.7721224],
      [35.108797, 32.773321],
      [35.1087468, 32.7752172],
      [35.1098771, 32.7752248],
      [35.1112158, 32.7751987],
      [35.1123943, 32.7750641],
      [35.1125548, 32.7748408],
      [35.1126676, 32.7742856],
      [35.1128922, 32.7742045]
    ]
  ]
};
function pointInRing(lon, lat, ring) {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const intersect = yi > lat !== yj > lat && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getObservationArea(lat, lon) {
  for (const key of SURVEY_AREA_KEYS) {
    const rings = SURVEY_POLYGONS[key];
    if (!rings) continue;
    if (rings.some((ring) => pointInRing(lon, lat, ring))) {
      return key;
    }
  }
  return null;
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children })
  ] });
}
function Check({
  checked,
  onChange,
  label,
  indeterminate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-0.5 text-xs font-normal hover:bg-secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked,
        ref: (el) => {
          if (el) el.indeterminate = !!indeterminate && !checked;
        },
        onChange: (e) => onChange(e.target.checked),
        className: "h-3 w-3 rounded border-border accent-[color:var(--primary)]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
  ] });
}
function FilterSidebar() {
  const { t, lang } = useI18n();
  const { observations, filters, setFilters, toggleSpeciesType, datasetBounds } = useObservations();
  const uniqueUserCategories = reactExports.useMemo(() => {
    const categories = /* @__PURE__ */ new Set();
    for (const obs of observations) {
      if (obs.user_category) {
        categories.add(obs.user_category);
      }
    }
    categories.add("מומחים");
    const order = ["קהילה", "community", "מומחים", "experts", "תלמידים", "סטודנטים", "student", "ציבור רחב"];
    return Array.from(categories).sort((a, b) => {
      const ai = order.findIndex((k) => a.includes(k));
      const bi = order.findIndex((k) => b.includes(k));
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [observations]);
  const uniqueYears = reactExports.useMemo(() => {
    const years = /* @__PURE__ */ new Set();
    for (const o of observations) {
      const d = o.observed_on;
      if (!d || d.length < 10) continue;
      const parts = d.split("/");
      if (parts.length === 3) {
        const year = parts[2];
        if (year && year.length === 4) {
          years.add(year);
        }
      }
    }
    return Array.from(years).sort();
  }, [observations]);
  const toggleYear = (year) => {
    setFilters((prev) => {
      const next = new Map(prev.time);
      if (next.has(year)) next.delete(year);
      else next.set(year, /* @__PURE__ */ new Set());
      let dateRange = prev.dateRange;
      if (next.size > 0) {
        const selectedYears = Array.from(next.keys()).map(Number).sort((a, b) => a - b);
        const earliest = selectedYears[0];
        const latest = selectedYears[selectedYears.length - 1];
        dateRange = {
          start: new Date(earliest, 0, 1).getTime(),
          end: new Date(latest, 11, 31, 23, 59, 59, 999).getTime()
        };
      } else if (datasetBounds) {
        dateRange = datasetBounds;
      }
      return { ...prev, time: next, dateRange };
    });
  };
  const toggleGroup = (g) => {
    setFilters((prev) => {
      const next = new Set(prev.groups);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return { ...prev, groups: next };
    });
  };
  const toggleArea = (key) => {
    setFilters((prev) => {
      const next = new Set(prev.areas);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, areas: next };
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex h-full w-48 shrink-0 flex-col gap-3 overflow-y-auto bg-card px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold", children: t("filters") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("years"), children: [
      uniqueYears.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs text-muted-foreground", children: "—" }),
      uniqueYears.map((year) => {
        const yearEntry = filters.time.get(year);
        const yearActive = yearEntry !== void 0;
        const hasSpecific = !!yearEntry && yearEntry.size > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Check,
          {
            checked: yearActive && !hasSpecific,
            indeterminate: hasSpecific,
            onChange: () => toggleYear(year),
            label: year
          },
          year
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: t("quality"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Check,
      {
        checked: filters.researchOnly,
        onChange: (b) => setFilters((p) => ({ ...p, researchOnly: b })),
        label: t("researchOnly")
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("speciesType"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Check,
        {
          checked: filters.speciesTypes.has("invasive"),
          onChange: () => toggleSpeciesType("invasive"),
          label: t("invasiveSpecies")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Check,
        {
          checked: filters.speciesTypes.has("rare"),
          onChange: () => toggleSpeciesType("rare"),
          label: t("rareSpecies")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Check,
        {
          checked: filters.speciesTypes.has("other_species"),
          onChange: () => toggleSpeciesType("other_species"),
          label: t("otherSpecies")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: t("targetPop"), children: uniqueUserCategories.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Check,
      {
        checked: filters.groups.has(g),
        onChange: () => toggleGroup(g),
        label: translateGroupName(g, lang)
      },
      g
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: t("areas"), children: SURVEY_AREA_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-0.5 text-xs font-normal hover:bg-secondary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.areas.has(key),
              onChange: () => toggleArea(key),
              className: "h-3 w-3 rounded border-border accent-[color:var(--primary)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: translateArea(key, lang) }),
          filters.areas.has(key) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-auto h-2 w-2 rounded-full shrink-0",
              style: { backgroundColor: AREA_COLORS[key] }
            }
          )
        ]
      },
      key
    )) })
  ] });
}
function DateRangeSlider({ min, max, value, onChange }) {
  const { lang, dir } = useI18n();
  const isRtl = dir === "rtl";
  const locale = lang === "he" ? "he-IL" : "en-US";
  const tickFormatter = reactExports.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale]
  );
  const handleChange = reactExports.useCallback(
    (v) => {
      onChange([v[0], v[1]]);
    },
    [onChange]
  );
  const ticks = reactExports.useMemo(() => {
    const startYear = new Date(min).getFullYear();
    const endYear = new Date(max).getFullYear();
    const result = [];
    const totalRange = max - min;
    if (totalRange <= 0) return result;
    for (let y = startYear; y <= endYear; y++) {
      for (const m of [0, 6]) {
        const ts = new Date(y, m, 1).getTime();
        if (ts < min || ts > max) continue;
        const pct = (ts - min) / totalRange * 100;
        result.push({ label: tickFormatter.format(new Date(ts)), pct });
      }
    }
    return result;
  }, [min, max, tickFormatter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col w-full px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Slider,
      {
        dir: isRtl ? "rtl" : "ltr",
        className: "relative flex w-full touch-none select-none items-center",
        min,
        max,
        step: 864e5,
        value,
        onValueChange: handleChange,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SliderTrack, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderRange, { className: "absolute h-full bg-yellow-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumb, { className: "block h-4 w-4 rounded-full border-2 border-yellow-500 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumb, { className: "block h-4 w-4 rounded-full border-2 border-yellow-500 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-5 mt-1", dir: "ltr", children: ticks.map((tick) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute text-xs font-semibold text-slate-700 -translate-x-1/2 whitespace-nowrap",
        style: { left: `${tick.pct}%` },
        children: tick.label
      },
      tick.pct
    )) })
  ] });
}
const Dashboard = reactExports.lazy(() => import("./dashboard-DgrDQdXi.mjs").then((m) => ({
  default: m.Dashboard
})));
const SpeciesDeepDive = reactExports.lazy(() => import("./species-deep-dive-BjecGvxR.mjs").then((m) => ({
  default: m.SpeciesDeepDive
})));
const PeopleDashboard = reactExports.lazy(() => import("./people-dashboard-Dp2kbe-q.mjs").then((m) => ({
  default: m.PeopleDashboard
})));
function Index() {
  const {
    t,
    lang,
    setLang,
    dir
  } = useI18n();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", dir, className: "relative flex h-full w-full overflow-hidden", children: [
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9998] bg-black/20 transition-opacity", onClick: () => setSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fixed top-0 z-[9999] h-full shadow-lg transition-transform duration-300 ease-in-out ${dir === "rtl" ? `right-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}` : `left-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen((v) => !v), className: `absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-20 bg-card border shadow-md rounded-md cursor-pointer hover:bg-secondary transition-colors ${dir === "rtl" ? "-left-5 rounded-r-none border-r-0" : "-right-5 rounded-l-none border-l-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3 text-muted-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex items-center justify-between px-4 py-1.5 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResetFiltersButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "inline-flex h-9 items-center rounded-full bg-muted p-1 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", className: "rounded-full px-4 h-7 text-sm font-semibold transition-colors data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground", children: t("overview") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "deep-dive", className: "rounded-full px-4 h-7 text-sm font-semibold transition-colors data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground", children: t("deepDive") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "people", className: "rounded-full px-4 h-7 text-sm font-semibold transition-colors data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground", children: t("people") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setLang(lang === "he" ? "en" : "he"), className: "inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-3.5 w-3.5" }),
          t("language")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalDateRangeBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", className: "flex-1 min-h-0 h-full mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Loading…" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "deep-dive", className: "flex-1 min-h-0 h-full mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Loading…" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SpeciesDeepDive, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "people", className: "flex-1 min-h-0 h-full mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Loading…" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleDashboard, {}) }) })
    ] })
  ] }) });
}
function ResetFiltersButton() {
  const {
    t
  } = useI18n();
  const {
    observations,
    filters,
    setFilters,
    datasetBounds
  } = useObservations();
  const uniqueYears = reactExports.useMemo(() => {
    const years = /* @__PURE__ */ new Set();
    for (const o of observations) {
      const d = o.observed_on;
      if (!d || d.length < 10) continue;
      const parts = d.split("/");
      if (parts.length === 3 && parts[2]?.length === 4) years.add(parts[2]);
    }
    return Array.from(years).sort();
  }, [observations]);
  const reset = () => {
    const defaultTime = /* @__PURE__ */ new Map();
    for (const y of uniqueYears) defaultTime.set(y, /* @__PURE__ */ new Set());
    setFilters({
      time: defaultTime,
      taxa: /* @__PURE__ */ new Set(["birds", "butterflies", "dragonflies", "mammals", "other"]),
      groups: /* @__PURE__ */ new Set(),
      researchOnly: false,
      areas: /* @__PURE__ */ new Set(),
      speciesTypes: /* @__PURE__ */ new Set(),
      dateRange: datasetBounds
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:border-primary/50 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
    t("resetFilters")
  ] });
}
function GlobalDateRangeBar() {
  const {
    filters,
    setDateRange,
    datasetBounds
  } = useObservations();
  if (!datasetBounds || !filters.dateRange) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white border-b px-6 pt-3 pb-1 shadow-sm z-10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangeSlider, { min: datasetBounds.start, max: datasetBounds.end, value: [filters.dateRange.start, filters.dateRange.end], onChange: ([start, end]) => setDateRange(start, end) }) });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: Index
}, Symbol.toStringTag, { value: "Module" }));
export {
  AREA_COLORS as A,
  SURVEY_AREA_KEYS as S,
  TAXA_GROUP_KEYS as T,
  translateMonth as a,
  translateGroupName as b,
  getObservationArea as c,
  getSpeciesClassification as d,
  cn as e,
  classifySpecies as f,
  getTaxaGroup as g,
  SURVEY_POLYGONS as h,
  index as i,
  speciesMap as s,
  translateTaxa as t,
  useObservations as u
};
