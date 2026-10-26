/* =====================================================================
   Map a Historic Cholera Outbreak (Soho, London, 1854)
   GeoInquiries Lab activity, converted from the Learn ArcGIS lesson
   "Map a historic cholera outbreak" and its web map
   8863ffcc86134abfac5573e96e0bf336 (Cholera Outbreak, 1854).
   No ArcGIS account, sign-in or Save steps: every Map Viewer step
   (layers, pop-ups, attribute table, Styles, Properties) is done in the app.
   ===================================================================== */
(function(){

/* ---------- data ---------- */
// Built-in copy of the Cholera Cases service (322 records, 578 deaths), used only if the live service fails.
// [Deaths, Address, lon, lat] — verified against the live layer (counts by Deaths value and every address with 5+ deaths).
const CASES=[[1,"69 Beak Street",-0.136785,51.51272],[1,"29 Kingly Street",-0.140034,51.513268],[3,"27 Heddon Street",-0.139875,51.511226],[1,"9 Poland Street",-0.13673,51.514183],[1,"31 Heddon Street",-0.139917,51.511275],[1,"55 Poland Street",-0.136689,51.513986],[2,"18 Fouberts Place",-0.139587,51.513538],[3,"43 Broadwick Street",-0.136732,51.513304],[1,"18 Kingly Street",-0.139682,51.512994],[1,"52 Broadwick Street",-0.13674,51.513364],[2,"18 Fouberts Place",-0.139587,51.513538],[1,"57 Poland Street",-0.136675,51.513967],[1,"1 Ramillies Place",-0.139479,51.515001],[3,"9 Poland Street",-0.13673,51.514183],[1,"34 Carnaby Street",-0.139344,51.514097],[1,"71 Beak Street",-0.136684,51.512754],[1,"24 Ganton Street",-0.139206,51.51294],[4,"43 Broadwick Street",-0.136732,51.513304],[1,"1 Heddon Street",-0.139421,51.510774],[4,"50 Broadwick Street",-0.136564,51.513407],[1,"33 Carnaby Street",-0.139186,51.513456],[2,"59 Poland Street",-0.13649,51.513701],[1,"19 Noel Street",-0.136485,51.514985],[1,"24 Ganton Street",-0.139206,51.51294],[1,"48 Beak Street",-0.136541,51.51274],[1,"31 Carnaby Street",-0.13932,51.513676],[1,"51 Lexington Street",-0.136506,51.513276],[1,"1 Ganton Street",-0.139274,51.512908],[2,"23 Ganton Street",-0.139257,51.512847],[1,"75 Beak Street",-0.136565,51.512795],[1,"29 Carnaby Street",-0.139113,51.513487],[1,"46 Broadwick Street",-0.136522,51.513418],[1,"1 Ganton Street",-0.139086,51.513001],[1,"23 Great Pulteney Street",-0.136467,51.512606],[8,"1 Kingly Court",-0.139162,51.512895],[1,"7 Poland Street",-0.136502,51.513856],[1,"41 Carnaby Street",-0.138968,51.513242],[1,"13 Bridle Lane",-0.136581,51.512199],[2,"4 Marlbrough Court",-0.139021,51.513358],[2,"75 Beak Street",-0.136565,51.512795],[2,"13 Ganton Street",-0.139029,51.51296],[5,"47 Lexington Street",-0.136376,51.513106],[1,"1 Ganton Street",-0.138887,51.513029],[2,"14 Darblay Street",-0.136457,51.51452],[1,"2 Marlbrough Court",-0.138972,51.513313],[1,"48 Berwick Street",-0.136321,51.515337],[1,"1 Lowndes Court",-0.138975,51.513572],[2,"1 Lexington Street",-0.136425,51.513298],[3,"10 Newburgh Street",-0.138812,51.513749],[1,"25 Great Pulteney Street",-0.136374,51.512492],[1,"13 Newburgh Street",-0.138789,51.513614],[1,"77 Beak Street",-0.136328,51.512885],[1,"10 Newburgh Street",-0.138812,51.513749],[1,"7 Newburgh Street",-0.138669,51.513603],[1,"1 Great Pulteney Street",-0.136019,51.512176],[1,"1 Ganton Street",-0.138565,51.513172],[2,"1 Lexington Street",-0.136425,51.513298],[1,"10 Ganton Street",-0.13845,51.513297],[1,"27 Great Pulteney Street",-0.136282,51.512379],[1,"48 Carnaby Street",-0.138394,51.512698],[1,"1 Portland Mews",-0.136195,51.514242],[1,"2 Newburgh Street",-0.138563,51.513504],[2,"43 Lexington Street",-0.136287,51.512999],[1,"1 Kingly Court",-0.138602,51.512383],[1,"1 Beak Street",-0.1364,51.512793],[3,"1 Ganton Street",-0.138565,51.513172],[1,"1 Great Pulteney Street",-0.136019,51.512176],[1,"10 Carnaby Street",-0.13832,51.512728],[1,"12 Darblay Street",-0.13626,51.514579],[1,"1 Ganton Street",-0.138565,51.513172],[1,"1 Broadwick Street",-0.136296,51.513424],[1,"1 Ganton Street",-0.138171,51.513329],[1,"27 Great Pulteney Street",-0.136282,51.512379],[2,"6 Ganton Street",-0.138282,51.513355],[1,"44 Lexington Street",-0.136211,51.513027],[4,"1 Ganton Street",-0.138565,51.513172],[2,"9 Portland Mews",-0.13616,51.514292],[1,"35 Marshall Street",-0.138205,51.513665],[1,"25 Darblay Street",-0.136166,51.514547],[1,"18 Marshall Street",-0.138235,51.513831],[3,"44 Lexington Street",-0.136211,51.513027],[3,"1 Ganton Street",-0.138171,51.513329],[2,"31 Broadwick Street",-0.136254,51.513436],[2,"35 Marshall Street",-0.138205,51.513665],[4,"32 Broadwick Street",-0.136186,51.513508],[2,"70 Broadwick Street",-0.137966,51.512927],[2,"10 Livonia Street",-0.136004,51.513974],[1,"4 Ganton Street",-0.138144,51.5134],[4,"27 Lexington Street",-0.136112,51.512816],[1,"70 Broadwick Street",-0.137966,51.512927],[1,"1 Great Pulteney Street",-0.136019,51.512176],[1,"50 Carnaby Street",-0.138152,51.512468],[1,"1 Livonia Street",-0.136044,51.514023],[2,"1 Ganton Street",-0.138171,51.513329],[1,"26 Darblay Street",-0.136082,51.514572],[1,"1 Broadwick Street",-0.136025,51.513541],[2,"16 Marshall Street",-0.13809,51.513642],[1,"37 Marshall Street",-0.138023,51.513429],[2,"33 Broadwick Street",-0.136158,51.513456],[1,"1 Upper John Street",-0.138022,51.511906],[1,"1 Great Pulteney Street",-0.136019,51.512176],[1,"51 Carnaby Street",-0.138083,51.512402],[5,"10 Livonia Street",-0.136004,51.513974],[1,"1 Carnaby Street",-0.138009,51.512432],[2,"1 Marshall Street",-0.13795,51.513332],[1,"27 Lexington Street",-0.136112,51.512816],[1,"1 Carnaby Street",-0.138009,51.512432],[1,"38 Lexington Street",-0.136117,51.512923],[4,"14 Marshall Street",-0.137944,51.513453],[1,"70 Berwick Street",-0.136034,51.514873],[3,"5 Great Marlborough Street",-0.13781,51.514713],[2,"1 Great Pulteney Street",-0.136019,51.512176],[1,"30 Broadwick Street",-0.13576,51.513621],[4,"1 Carnaby Street",-0.138009,51.512432],[1,"7 Silver Place",-0.135978,51.513002],[1,"40 Poland Street",-0.137695,51.515599],[1,"36 Lexington Street",-0.135958,51.512769],[1,"1 Marshall Street",-0.137809,51.513144],[1,"27 Darblay Street",-0.135998,51.514598],[3,"10 Marshall Street",-0.137928,51.513433],[3,"16 Ingestre Place",-0.135976,51.513501],[2,"11 Marshall Street",-0.137812,51.513277],[3,"1 Lexington Street",-0.135983,51.512692],[4,"1 Marshall Street",-0.137809,51.513144],[4,"10 Livonia Street",-0.136004,51.513974],[1,"11 Marshall Street",-0.137812,51.513277],[1,"1 Great Pulteney Street",-0.136019,51.512176],[2,"68 Broadwick Street",-0.137743,51.513057],[2,"1 Silver Place",-0.136121,51.512895],[1,"37 Beak Street",-0.137885,51.51228],[1,"7 Marshall Street",-0.13773,51.513167],[1,"7 Portland Mews",-0.135891,51.514062],[2,"4 Great Marlborough Street",-0.137686,51.514747],[4,"30 Broadwick Street",-0.13576,51.513621],[4,"7 Marshall Street",-0.13773,51.513167],[1,"7 Silver Place",-0.135978,51.513002],[2,"33 Golden Square",-0.137788,51.511757],[2,"1 Lexington Street",-0.135927,51.512637],[1,"49 Marshall Street",-0.137729,51.513027],[4,"35 Great Pulteney Street",-0.135864,51.511937],[1,"39 Beak Street",-0.137518,51.51243],[2,"1 Silver Place",-0.136121,51.512895],[1,"38 Beak Street",-0.13747,51.512384],[1,"1 Livonia Street",-0.135695,51.514132],[4,"1 Marshall Street",-0.137544,51.512924],[5,"30 Broadwick Street",-0.13576,51.513621],[3,"39 Beak Street",-0.137518,51.51243],[1,"6 Silver Place",-0.135794,51.513061],[2,"1 Broadwick Street",-0.137397,51.513164],[2,"14 Livonia Street",-0.135656,51.514083],[1,"1 Marshall Street",-0.137483,51.512726],[1,"1 Lexington Street",-0.135826,51.512538],[2,"1 Marshall Street",-0.137544,51.512924],[2,"9 Dufours Place",-0.137298,51.51348],[1,"14 Ingestre Place",-0.135797,51.513303],[3,"61 Broadwick Street",-0.13736,51.513114],[2,"2 Silver Place",-0.135571,51.513071],[2,"9 Dufours Place",-0.137298,51.51348],[2,"1 Great Pulteney Street",-0.136019,51.512176],[1,"7 Upper James Street",-0.137506,51.512385],[1,"24 Hollen Street",-0.135835,51.515153],[1,"30 Broadwick Street",-0.13576,51.513621],[1,"9 Dufours Place",-0.137298,51.51348],[2,"1 Livonia Street",-0.135695,51.514132],[2,"2 Marshall Street",-0.13741,51.512757],[1,"6 Silver Place",-0.135794,51.513061],[5,"19 Marshall Street",-0.138315,51.513929],[3,"14 Ingestre Place",-0.135797,51.513303],[1,"15 Dufours Place",-0.137219,51.513503],[2,"61 Broadwick Street",-0.13736,51.513114],[1,"1 Great Pulteney Street",-0.136019,51.512176],[1,"1 Marshall Street",-0.137278,51.512638],[1,"12 Ingestre Place",-0.135623,51.513101],[1,"1 Upper James Street",-0.137242,51.512236],[2,"5 Silver Place",-0.135611,51.513119],[1,"77 Berwick Street",-0.135672,51.514419],[3,"61 Broadwick Street",-0.13736,51.513114],[2,"34 Lexington Street",-0.135752,51.512567],[1,"1 Marshall Street",-0.137278,51.512638],[3,"1 Great Pulteney Street",-0.136019,51.512176],[1,"1 Upper James Street",-0.137242,51.512236],[4,"2 Silver Place",-0.135571,51.513071],[1,"21 Poland Street",-0.137183,51.514855],[1,"9 Dufours Place",-0.137298,51.51348],[2,"79 Berwick Street",-0.135579,51.514302],[2,"51 Beak Street",-0.137232,51.512559],[1,"34 Berwick Street",-0.135619,51.514476],[3,"1 Poland Street",-0.137017,51.514462],[3,"30 Broadwick Street",-0.13576,51.513621],[2,"13 Poland Street",-0.137041,51.514642],[1,"8 Ingestre Place",-0.135598,51.513069],[1,"61 Broadwick Street",-0.13736,51.513114],[2,"17 Wardour Mews",-0.135458,51.514687],[1,"53 Beak Street",-0.137008,51.512644],[1,"8 Ingestre Place",-0.135598,51.513069],[4,"47 Broadwick Street",-0.136927,51.513242],[1,"32 Berwick Street",-0.135513,51.514343],[2,"30 Bridle Lane",-0.136986,51.512573],[3,"20 Broadwick Street",-0.135377,51.513746],[3,"12 Poland Street",-0.136936,51.514483],[1,"1 Livonia Street",-0.135695,51.514132],[1,"32 Berwick Street",-0.135513,51.514343],[2,"54 Broadwick Street",-0.136902,51.513311],[5,"20 Broadwick Street",-0.135377,51.513746],[1,"67 Beak Street",-0.136885,51.512686],[1,"8 Ingestre Place",-0.135598,51.513069],[3,"53 Poland Street",-0.136851,51.514219],[3,"52 Broadwick Street",-0.13674,51.513364],[3,"82 Berwick Street",-0.135413,51.514099],[1,"183 Wardour Street",-0.135346,51.51516],[18,"45 Broadwick Street",-0.136829,51.513273],[3,"17 Noel Street",-0.136797,51.514913],[1,"1 Lexington Street",-0.13547,51.512198],[1,"1 Berwick Street",-0.135335,51.514125],[5,"83 Berwick Street",-0.135298,51.513965],[2,"8 Ingestre Place",-0.135598,51.513069],[1,"1 Hopkins Street",-0.135368,51.513531],[1,"1 Lexington Street",-0.135333,51.512082],[2,"1 Berwick Street",-0.135335,51.514125],[1,"1 Lexington Street",-0.135399,51.512231],[2,"1 Kemp Court",-0.135134,51.513522],[1,"13 Broadwick Street",-0.135336,51.513698],[1,"172 Wardour Street",-0.135221,51.515123],[7,"7 Ingestre Place",-0.134841,51.512851],[2,"1 Kemp Court",-0.13509,51.513475],[1,"13 Broadwick Street",-0.135336,51.513698],[2,"23 Berwick Street",-0.13522,51.513991],[1,"1 Hopkins Street",-0.135038,51.513167],[1,"1 Kemp Court",-0.135134,51.513522],[1,"1 Hopkins Street",-0.135038,51.513167],[1,"1 Lexington Street",-0.135146,51.512026],[3,"7 Ingestre Place",-0.134841,51.512851],[4,"1 Lexington Street",-0.135097,51.511913],[5,"1 Hopkins Street",-0.135038,51.513167],[2,"1 Kemp Court",-0.135134,51.513522],[1,"15 Hollen Street",-0.134926,51.515474],[1,"1 Broadwick Street",-0.13498,51.513899],[3,"1 Peter Street",-0.134828,51.512574],[1,"20 Peter Street",-0.134785,51.512526],[1,"28 Brewer Street",-0.134664,51.512047],[1,"7 Ingestre Place",-0.134841,51.512851],[3,"89 Berwick Street",-0.134806,51.513419],[1,"30 Brewer Street",-0.134836,51.511955],[1,"18 Berwick Street",-0.134834,51.513563],[1,"8 Broadwick Street",-0.134858,51.514],[1,"147 Wardour Street",-0.134802,51.514445],[2,"20 Peter Street",-0.134785,51.512526],[1,"2 Sheraton Street",-0.134594,51.514895],[1,"3 Duck Lane",-0.134674,51.513733],[1,"20 Peter Street",-0.134785,51.512526],[1,"20 Peter Street",-0.134785,51.512526],[2,"14 Berwick Street",-0.134679,51.51339],[1,"3 Duck Lane",-0.134674,51.513733],[1,"134 Wardour Street",-0.134682,51.514418],[1,"13 Berwick Street",-0.13464,51.513346],[1,"1 Hopkins Street",-0.13474,51.512746],[1,"145 Wardour Street",-0.134629,51.514229],[2,"11 Berwick Street",-0.134564,51.513258],[1,"7 Broadwick Street",-0.134565,51.514028],[9,"5 Greens Court",-0.134661,51.512583],[1,"10 Berwick Street",-0.134526,51.513215],[1,"4 Great Chapel Street",-0.134502,51.51587],[2,"7 Greens Court",-0.134466,51.512399],[1,"25 Great Windmill Street",-0.134774,51.511825],[1,"4 Great Chapel Street",-0.134502,51.51587],[1,"26 Brewer Street",-0.13456,51.512096],[2,"122 Wardour Street",-0.134444,51.514138],[2,"8 Berwick Street",-0.13445,51.513127],[1,"14 Berwick Street",-0.134679,51.51339],[1,"24 Brewer Street",-0.134409,51.512166],[1,"6 Greens Court",-0.134457,51.51249],[2,"116 Wardour Street",-0.134356,51.514049],[2,"7 Greens Court",-0.134466,51.512399],[1,"7 Berwick Street",-0.134412,51.513083],[1,"14 Ham Yard",-0.134475,51.511303],[8,"6 Berwick Street",-0.134374,51.51304],[1,"124 Wardour Street",-0.134513,51.514211],[1,"116 Wardour Street",-0.134356,51.514049],[2,"5 Berwick Street",-0.134336,51.512996],[1,"123 Wardour Street",-0.13426,51.513807],[2,"1 Saint Annes Court",-0.134288,51.514563],[1,"3 Berwick Street",-0.13426,51.512909],[1,"119 Wardour Street",-0.134155,51.513661],[5,"102 Wardour Street",-0.13418,51.51383],[1,"1 Saint Annes Court",-0.134288,51.514563],[2,"117 Wardour Street",-0.134135,51.513632],[1,"1 Flaxman Court",-0.134201,51.514046],[1,"109 Wardour Street",-0.133923,51.513313],[1,"41 Great Windmill Street",-0.134169,51.511102],[1,"19 A401",-0.134121,51.510649],[1,"98 Wardour Street",-0.134075,51.513684],[1,"18 Brewer Street",-0.13415,51.512286],[2,"29 Saint Annes Court",-0.133757,51.514705],[2,"113 Wardour Street",-0.134029,51.513473],[2,"1 Flaxman Court",-0.134201,51.514046],[1,"94 Wardour Street",-0.134001,51.513573],[1,"92 Wardour Street",-0.133948,51.513493],[1,"13 Brewer Street",-0.134183,51.512201],[1,"29 Saint Annes Court",-0.133757,51.514705],[1,"59 Rupert Street",-0.133671,51.512148],[1,"3 Richmond Buildings",-0.133315,51.514235],[1,"5 Walkers Court",-0.134018,51.512579],[1,"29 Saint Annes Court",-0.133757,51.514705],[5,"29 Saint Annes Court",-0.133757,51.514705],[1,"29 Peter Street",-0.13392,51.51286],[1,"29 Saint Annes Court",-0.133757,51.514705],[1,"29 Saint Annes Court",-0.133757,51.514705],[1,"6 Brewer Street",-0.133859,51.512407],[1,"4 Brewer Street",-0.133576,51.512534],[4,"29 Saint Annes Court",-0.133757,51.514705],[1,"29 Saint Annes Court",-0.133757,51.514705],[1,"1 Meard Street",-0.133421,51.513151],[2,"85 Dean Street",-0.133179,51.514566],[1,"85 Dean Street",-0.133179,51.514566],[1,"1 Rupert Street",-0.133237,51.51166],[2,"13 Meard Street",-0.133313,51.513133],[1,"1 Meard Street",-0.133421,51.513151],[1,"7 Meard Street",-0.13292,51.513266],[1,"2 Bourchier Street",-0.132529,51.513074],[1,"30 Rupert Street",-0.132755,51.511167],[1,"5 Rupert Court",-0.132691,51.511054],[2,"1 Marlbrough Court",-0.138595,51.51347]];
const PUMPS=[
  ["43 Broadwick Street",-0.136607,51.513324],["1 Great Titchfield Street",-0.139608,51.516342],["10 Ramillies Place",-0.139617,51.514883],
  ["2 Berners Street",-0.135874,51.516074],["1 Newman Street",-0.134688,51.516264],["1 Carnaby Street",-0.139525,51.513844],
  ["11 Warwick Street",-0.138192,51.511271],["9 Vigo Street",-0.139566,51.510154],["20 A4",-0.134007,51.510063],
  ["52 Rupert Street",-0.133575,51.512103],["54 Dean Street",-0.131615,51.512321],["36 Bridle Lane",-0.135917,51.511503],
  ["20 Eastcastle St",-0.137750,51.516627]
];
const BROAD=PUMPS[0];
const TOTAL=CASES.reduce((n,c)=>n+c[0],0);
const SNOW_URL="https://tiles.arcgis.com/tiles/j80Jz20at6Bi0thr/arcgis/rest/services/Snow_cholera_map_detailed/MapServer";
const CASES_URL="https://services2.arcgis.com/j80Jz20at6Bi0thr/arcgis/rest/services/CholeraOutbreak1854/FeatureServer/0";
const PUMPS_URL="https://services2.arcgis.com/j80Jz20at6Bi0thr/arcgis/rest/services/WaterPumps/FeatureServer/0";

function metres(lon1,lat1,lon2,lat2){
  const R=6371008.8, r=Math.PI/180, dl=(lon2-lon1)*r, dp=(lat2-lat1)*r;
  const a=Math.sin(dp/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dl/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}
const deathsWithin=(m)=>CASES.reduce((n,c)=>n+(metres(c[2],c[3],BROAD[1],BROAD[2])<=m?c[0]:0),0);
const RING_TARGET=(()=>{ for(let r=25;r<=400;r+=25) if(deathsWithin(r)>=0.75*TOTAL) return r; return 400; })();

/* ---------- map helpers (Snow's scanned map, case styles) ---------- */
let readyResolve; const mapReady=new Promise(r=>readyResolve=r);
const CASE_COLOR="#B3261E";
const HEAT_STOPS=[
  {ratio:0,color:"rgba(98,20,140,0)"},{ratio:.08,color:"rgba(98,20,140,.55)"},{ratio:.3,color:"rgba(160,30,120,.75)"},
  {ratio:.55,color:"rgba(215,48,39,.85)"},{ratio:.8,color:"rgba(252,141,40,.9)"},{ratio:1,color:"rgba(255,230,60,.95)"}
];
const STYLE_LEGENDS={
  single:[{label:"Address with one or more deaths",color:CASE_COLOR,shape:"circle"}],
  size:[{label:"Circle size = number of deaths (1 to 18)",color:CASE_COLOR,shape:"circle"}],
  heatLocation:[{label:"Fewer cases close together",color:"#7A2A9A",shape:"square"},{label:"More cases close together",color:"#D7301F",shape:"square"},{label:"Densest cluster of cases",color:"#FFE13C",shape:"square"}],
  heat:[{label:"Lower density of deaths",color:"#7A2A9A",shape:"square"},{label:"Higher density of deaths",color:"#D7301F",shape:"square"},{label:"Densest concentration of deaths",color:"#FFE13C",shape:"square"}]
};
const casesCfg=()=>window.GeoInquiry.map.cfg.cases;

function renderers(kind){
  const sym=(size)=>({type:"simple-marker",style:"circle",size:size||7,color:CASE_COLOR,outline:{color:"#fff",width:.8}});
  if(kind==="size") return {type:"simple",symbol:sym(6),visualVariables:[{type:"size",field:"Deaths",stops:[{value:1,size:6},{value:5,size:15},{value:18,size:34}]}]};
  // referenceScale pins the surface to the "Snow's map" view (about 1:9,000) so the yellow core looks the same at every zoom
  if(kind==="heat"||kind==="heatLocation") return Object.assign({type:"heatmap",colorStops:HEAT_STOPS,radius:22,referenceScale:9028,minDensity:0},
    kind==="heat"?{field:"Deaths",maxDensity:.035}:{maxDensity:.02});
  return {type:"simple",symbol:sym(7)};
}
// Heat maps need a FeatureLayer. If the live service failed, the engine shows a GraphicsLayer copy; swap it for a client-side FeatureLayer.
function casesLayer(api){
  const M=api.map.modules, cur=api.map.layers.cases; if(!M||!cur) return null;
  if(cur.type==="feature") return cur;
  const src=CASES.map((c,i)=>new M.Graphic({geometry:new M.Point({longitude:c[2],latitude:c[3]}),attributes:{OBJECTID_1:i+1,Deaths:c[0],Address:c[1],__name:c[1]}}));
  const fl=new M.FeatureLayer({source:src,objectIdField:"OBJECTID_1",geometryType:"point",spatialReference:{wkid:4326},title:"Cholera Cases",visible:cur.visible,
    fields:[{name:"OBJECTID_1",type:"oid"},{name:"Deaths",type:"double"},{name:"Address",type:"string"},{name:"__name",type:"string"}],outFields:["*"],
    renderer:renderers("single"),popupTemplate:{title:"{Address}",content:(ev)=>casePopup(ev.graphic.attributes)}});
  const m=api.map.view.map, idx=m.layers.indexOf(cur); m.remove(cur); m.add(fl,Math.max(0,idx)); api.map.layers.cases=fl;
  return fl;
}
function setCaseStyle(api,kind,props){
  const L=casesLayer(api); if(!L) return;
  L.renderer=renderers(kind);
  if(props){ L.blendMode=props.blend||"normal"; L.opacity=props.opacity==null?1:props.opacity; }
  casesCfg().legend=STYLE_LEGENDS[kind]; api.renderLegend();
}
// Re-apply the style a student has earned when they come back to a section (renderers aren't saved in progress)
function restoreStyle(api,sectionId){
  mapReady.then(()=>{
    const styled=api.taskDone("expStyle"), props=api.taskDone("expProps");
    if(sectionId==="ask"||sectionId==="acquire"||!styled) setCaseStyle(api,"single",{});
    else setCaseStyle(api,"heat",props?{blend:"multiply",opacity:.75}:{});
  });
}
function casePopup(a){
  const n=+a.Deaths||0;
  return `<b>${n}</b> ${n===1?"death":"deaths"} recorded at this address in the 1854 outbreak.`;
}
function addSnowMap(api){
  // Snow's map is a cached tile service, which the engine doesn't build, so it is swapped in here.
  return new Promise(resolve=>{
    require(["esri/layers/TileLayer"],(TileLayer)=>{
      const m=api.map.view.map, placeholder=api.map.layers.snow, idx=Math.max(0,m.layers.indexOf(placeholder));
      const tl=new TileLayer({url:SNOW_URL,title:"Snow's Cholera Map",visible:placeholder?placeholder.visible:true});
      if(placeholder) m.remove(placeholder); m.add(tl,idx); api.map.layers.snow=tl;
      tl.load().then(resolve).catch(err=>{
        console.warn("Snow's map unavailable",err&&err.message); m.remove(tl); delete api.map.layers.snow; api.map.unavailable.snow=true; api.map.cfg.snow.legend="none";
        const cb=document.querySelector('#layersList input[data-layer="snow"]'); if(cb){ cb.checked=false; cb.disabled=true; cb.parentNode.classList.add("unavailable"); cb.parentNode.append(" (unavailable)"); }
        api.renderLegend(); resolve();
      });
    },()=>resolve());
  });
}
// Small helper for custom tasks: skip a map task cleanly when the map can't load
function skipIfNoMap(api,id,f){
  if(api.map.failed){ if(id&&!api.taskDone(id)) api.markTask(id,0); api.fb(f,false,"The map is not available, so this task is skipped."); return true; }
  return false;
}

/* ---------- custom tasks ---------- */
// Acquire: click a case to open its pop-up (the engine's click task reads Name fields; cases use Address)
function caseClickTask(container,api,t){
  const card=api.h(`<div class="task"><span class="pts">${t.points} pts</span><h3>${t.title}</h3><p>${t.text}</p><div class="feedback" hidden></div></div>`);
  const f=card.querySelector(".feedback"); container.appendChild(card);
  if(api.taskDone(t.id)){ api.fb(f,true,"Done. You opened a Cholera Cases pop-up."); return; }
  if(skipIfNoMap(api,t.id,f)) return;
  api.banner("<b>Map task:</b> click a red Cholera Cases point to open its pop-up");
  api.map.clickHandler=async(ev)=>{
    const L=api.map.layers.cases; if(!L||!L.visible){ api.fb(f,false,"Turn on the Cholera Cases layer first."); return; }
    const hit=await api.map.view.hitTest(ev,{include:L});
    const g=hit.results.find(r=>r.graphic&&r.graphic.attributes); if(!g) return;
    const a=g.graphic.attributes, addr=a.Address||a.__name||"this address", n=+a.Deaths||0;
    api.fb(f,true,`<b>${api.esc(addr)}</b>: ${n} ${n===1?"death":"deaths"}. Each pop-up gives the address and the number of deaths there, but not the cause.`);
    api.markTask(t.id,t.points,"points"); api.banner(""); api.map.clickHandler=null;
  };
}

// Acquire: attribute table, sortable by Deaths (Map Viewer's "Show table")
function tableTask(container,api,t){
  const card=api.h(`<div class="task"><span class="pts">${t.points} pts</span><h3>${t.title}</h3><p>${t.text}</p>
    <div class="row" style="margin-bottom:8px"><button class="secondary" type="button" data-sort="desc">Sort Deaths: high → low</button><button class="secondary" type="button" data-sort="asc">Sort Deaths: low → high</button></div>
    <div class="attr-table" tabindex="0" role="region" aria-label="Cholera Cases attribute table" style="max-height:260px;overflow:auto;border:1px solid var(--rule);border-radius:6px;background:#fff">
      <table style="width:100%;border-collapse:collapse;font-size:14px"><caption class="visually-hidden">Cholera Cases: ${CASES.length} records</caption>
        <thead><tr><th scope="col" style="text-align:left;position:sticky;top:0;background:var(--callout);padding:6px 8px">Address</th><th scope="col" aria-sort="none" style="text-align:right;position:sticky;top:0;background:var(--callout);padding:6px 8px">Deaths</th></tr></thead><tbody></tbody></table>
    </div>
    <p class="hint">${CASES.length} records · ${TOTAL} deaths in all. Select a row to zoom to it on the map.</p><div class="feedback" hidden></div></div>`);
  const tb=card.querySelector("tbody"), f=card.querySelector(".feedback"), th=card.querySelectorAll("th")[1];
  let rows=CASES.map((c,i)=>({i,d:c[0],a:c[1],x:c[2],y:c[3]}));
  function draw(){
    tb.innerHTML=rows.map(r=>`<tr data-i="${r.i}" tabindex="0" style="cursor:pointer;border-top:1px solid var(--rule)"><td style="padding:4px 8px">${api.esc(r.a)}</td><td style="padding:4px 8px;text-align:right">${r.d}</td></tr>`).join("");
    tb.querySelectorAll("tr").forEach(tr=>{ const go=()=>{ const r=rows.find(x=>x.i===+tr.dataset.i); zoomTo(r); }; tr.addEventListener("click",go); tr.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } }); });
  }
  function zoomTo(r){
    if(!api.map.ready) return; const M=api.map.modules, lyr=api.map.layers.__game; lyr.removeAll();
    const p=new M.Point({longitude:r.x,latitude:r.y});
    lyr.add(new M.Graphic({geometry:p,symbol:{type:"simple-marker",style:"circle",size:22,color:[0,0,0,0],outline:{color:"#FFD400",width:3}}}));
    api.map.view.goTo({target:p,zoom:19}).catch(()=>{});
  }
  card.querySelectorAll("[data-sort]").forEach(b=>b.addEventListener("click",()=>{
    const desc=b.dataset.sort==="desc"; rows.sort((p,q)=>desc?(q.d-p.d||p.a.localeCompare(q.a)):(p.d-q.d||p.a.localeCompare(q.a)));
    th.setAttribute("aria-sort",desc?"descending":"ascending"); draw();
    if(desc&&!api.taskDone(t.id)){ api.markTask(t.id,t.points,"points"); api.fb(f,true,"Sorted from most to fewest deaths. The top of the table shows the hardest-hit addresses."); }
    else if(!desc&&!api.taskDone(t.id)) api.fb(f,false,"That puts the fewest deaths first. Sort the other way to see the hardest-hit addresses.");
  }));
  draw(); container.appendChild(card);
  if(api.taskDone(t.id)) api.fb(f,true,"Done. Sort again any time.");
}

// Explore: Map Viewer's Styles pane — choose attribute, then style
function stylesTask(container,api,t){
  const card=api.h(`<div class="task"><span class="pts">${t.points} pts</span><h3>${t.title}</h3><p>${t.text}</p>
    <div class="styles-pane" style="border:1px solid var(--rule);border-radius:6px;padding:10px 12px;background:#fff">
      <p style="margin:0 0 6px"><b>1. Choose attributes</b></p>
      <div class="choices inline" data-step="field"><button type="button" data-v="">Location only</button><button type="button" data-v="Deaths">+ Field: Deaths</button></div>
      <p style="margin:10px 0 6px"><b>2. Pick a style</b></p>
      <div class="choices inline" data-step="style"></div>
      <div class="row" style="margin-top:10px"><button class="primary" type="button" data-done>Done</button></div>
    </div><div class="feedback" hidden></div></div>`);
  const f=card.querySelector(".feedback"), fieldEl=card.querySelector('[data-step="field"]'), styleEl=card.querySelector('[data-step="style"]');
  let field=api.taskDone(t.id)?"Deaths":"", style=api.taskDone(t.id)?"heat":"single";
  function drawStyles(){
    const opts=field?[["size","Counts and Amounts (size)"],["heat","Heat map"]]:[["single","Location (single symbol)"],["heat","Heat map"]];
    if(!opts.some(o=>o[0]===style)) style=opts[0][0];
    styleEl.innerHTML=opts.map(([k,l])=>`<button type="button" data-v="${k}" aria-pressed="${k===style}" class="${k===style?"correct":""}">${l}</button>`).join("");
    styleEl.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{ style=b.dataset.v; drawStyles(); apply(); }));
    fieldEl.querySelectorAll("button").forEach(b=>{ const on=b.dataset.v===field; b.classList.toggle("correct",on); b.setAttribute("aria-pressed",String(on)); });
  }
  function apply(){
    const kind=style==="heat"?(field?"heat":"heatLocation"):style;
    mapReady.then(()=>setCaseStyle(api,kind));
    const msg={single:"Every address gets the same red dot.",size:"Bigger circles now mean more deaths at that address.",heatLocation:"This heat map shows where case <i>locations</i> crowd together, but every address counts the same.",heat:"The heat map now weighs each address by its number of deaths."}[kind];
    if(!api.taskDone(t.id)) api.fb(f,null,msg);
  }
  fieldEl.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{ field=b.dataset.v; drawStyles(); apply(); }));
  card.querySelector("[data-done]").addEventListener("click",()=>{
    if(api.taskDone(t.id)){ api.fb(f,true,"Done. Heat map weighted by Deaths is applied."); return; }
    if(field==="Deaths"&&style==="heat"){ api.markTask(t.id,t.points,"points"); api.fb(f,true,"Heat map applied. Warmer colours show where deaths were most concentrated, counting both how close cases are and how many deaths each address had."); }
    else if(style!=="heat") api.fb(f,false,"Pick the <b>Heat map</b> style before you select Done.");
    else api.fb(f,false,"Your heat map counts every address the same. Add the <b>Deaths</b> field so addresses with more deaths weigh more.");
  });
  drawStyles(); container.appendChild(card);
  if(skipIfNoMap(api,null,f)){ if(!api.taskDone(t.id)) api.markTask(t.id,0); return; }
  if(api.taskDone(t.id)) api.fb(f,true,"Done. Heat map weighted by Deaths is applied.");
  else apply();
}

// Explore: Map Viewer's Properties pane — blending and transparency for Cholera Cases
function propertiesTask(container,api,t){
  const done=api.taskDone(t.id);
  const card=api.h(`<div class="task"><span class="pts">${t.points} pts</span><h3>${t.title}</h3><p>${t.text}</p>
    <div style="border:1px solid var(--rule);border-radius:6px;padding:10px 12px;background:#fff">
      <label for="blend_${t.id}"><b>Blending</b></label><br>
      <select id="blend_${t.id}" style="font:inherit;padding:4px 6px;margin:4px 0 10px">
        <option value="normal">Normal</option><optgroup label="Darken"><option value="multiply">Multiply</option><option value="darken">Darken</option></optgroup><optgroup label="Lighten"><option value="screen">Screen</option><option value="lighten">Lighten</option></optgroup><optgroup label="Contrast"><option value="overlay">Overlay</option></optgroup>
      </select><br>
      <label for="tr_${t.id}"><b>Transparency</b>: <span data-out>0</span>%</label><br>
      <input type="range" id="tr_${t.id}" min="0" max="100" step="5" value="0" style="width:100%">
    </div><div class="feedback" hidden></div></div>`);
  const f=card.querySelector(".feedback"), sel=card.querySelector("select"), rng=card.querySelector("input"), out=card.querySelector("[data-out]");
  if(done){ sel.value="multiply"; rng.value=25; }
  out.textContent=rng.value;
  container.appendChild(card);
  if(skipIfNoMap(api,t.id,f)) return;
  function apply(){
    out.textContent=rng.value;
    mapReady.then(()=>{ const L=casesLayer(api); if(L){ L.blendMode=sel.value; L.opacity=1-(+rng.value/100); } });
    if(api.taskDone(t.id)) return;
    if(!api.taskDone("expStyle")){ api.fb(f,null,"Finish the Styles task above (heat map with Deaths) first, then set Blending and Transparency."); return; }
    if(sel.value==="multiply"&&+rng.value===25){ api.markTask(t.id,t.points,"points"); api.fb(f,true,"Blending is Multiply and transparency is 25%. Snow's streets and hash marks now show through the heat map."); }
    else api.fb(f,null,`Blending: ${sel.options[sel.selectedIndex].text}, transparency ${rng.value}%. Set Blending to Multiply and Transparency to 25%.`);
  }
  sel.addEventListener("change",apply); rng.addEventListener("input",apply);
  if(done){ api.fb(f,true,"Done. Blending is Multiply and transparency is 25%."); apply(); }
}

// Analyze: distance rings around the Broad Street pump
function ringTask(container,api,t){
  const card=api.h(`<div class="task"><span class="pts">${t.points} pts</span><h3>${t.title}</h3><p>${t.text}</p>
    <label for="ring_${t.id}"><b>Ring radius</b>: <span data-r>100</span> m</label>
    <input type="range" id="ring_${t.id}" min="25" max="400" step="25" value="100" style="width:100%">
    <p data-stat style="margin:6px 0" aria-live="polite"></p>
    <div class="row"><button class="primary" type="button">Lock in this radius</button></div><div class="feedback" hidden></div></div>`);
  const f=card.querySelector(".feedback"), rng=card.querySelector("input"), rOut=card.querySelector("[data-r]"), stat=card.querySelector("[data-stat]"), btn=card.querySelector("button.primary");
  container.appendChild(card); let ringGeom=null;
  function draw(){
    const r=+rng.value, n=deathsWithin(r); rOut.textContent=r;
    stat.innerHTML=`Inside the ring: <b>${n}</b> of ${TOTAL} deaths (<b>${Math.round(100*n/TOTAL)}%</b>)`;
    if(!api.map.ready) return; const M=api.map.modules, lyr=api.map.layers.__game; lyr.removeAll();
    const p=new M.Point({longitude:BROAD[1],latitude:BROAD[2]});
    const ring=M.geometryEngine.geodesicBuffer(p,r,"meters"); ringGeom=ring;
    lyr.add(new M.Graphic({geometry:ring,symbol:{type:"simple-fill",color:[30,90,160,.10],outline:{color:[20,70,140,1],width:2.5,style:"dash"}}}));
    lyr.add(new M.Graphic({geometry:p,symbol:{type:"simple-marker",style:"circle",size:10,color:[20,70,140,1],outline:{color:"#fff",width:1.5}}}));
  }
  rng.addEventListener("input",draw);
  // when the slider is released, make sure the whole ring is on screen
  rng.addEventListener("change",()=>{ if(api.map.ready&&ringGeom) api.map.view.goTo(ringGeom.extent.clone().expand(1.15)).catch(()=>{}); });
  if(api.taskDone(t.id)){ rng.value=RING_TARGET; btn.disabled=true; api.fb(f,true,`Done. A ${RING_TARGET} m ring holds ${deathsWithin(RING_TARGET)} of ${TOTAL} deaths.`); }
  draw();
  if(!api.map.ready&&!api.map.failed) mapReady.then(draw);
  if(api.map.ready) api.goTo({target:[BROAD[1],BROAD[2]],zoom:17});
  btn.addEventListener("click",()=>{
    const r=+rng.value, n=deathsWithin(r);
    if(r===RING_TARGET){ btn.disabled=true; api.markTask(t.id,t.points,"points"); api.fb(f,true,`Correct. ${RING_TARGET} m is the smallest ring holding at least three-quarters of the deaths (${n} of ${TOTAL}, ${Math.round(100*n/TOTAL)}%). That is only a couple of minutes' walk from the pump.`); }
    else if(n<0.75*TOTAL) api.fb(f,false,`${r} m holds only ${Math.round(100*n/TOTAL)}% of the deaths. Make the ring bigger.`);
    else api.fb(f,false,`${r} m holds ${Math.round(100*n/TOTAL)}%, which is enough, but a smaller ring would do it too. Shrink it.`);
  });
}

/* ---------- layers & bookmarks ---------- */
const LAYERS=[
  {key:"pumps",title:"Water Pumps",visible:false,url:PUMPS_URL,nameField:"Name",shape:"square",color:"#1F5FA8",size:11,legendLabel:"Public water pump",
   popup:{title:"{Name}",content:(a)=>/broadwick/i.test(a.Name||"")?"The <b>Broad Street pump</b>. Broad Street has since been renamed Broadwick Street.":"A public water pump. Households without piped water carried drinking water home from pumps like this one."},
   sourceNote:"13 public water pumps in and around Soho, from the lesson's web map.",
   features:PUMPS.map(p=>({lon:p[1],lat:p[2],attrs:{Name:p[0]}}))},
  {key:"cases",title:"Cholera Cases",visible:false,url:CASES_URL,nameField:"Address",shape:"circle",color:CASE_COLOR,size:7,legend:STYLE_LEGENDS.single,
   popup:{title:"{Address}",content:(a)=>casePopup(a)},
   sourceNote:"One point per address recorded on Snow's map, with the number of deaths (322 records, 578 deaths).",
   features:CASES.map(c=>({lon:c[2],lat:c[3],attrs:{Deaths:c[0],Address:c[1]}}))},
  {key:"snow",title:"Snow's Cholera Map",visible:true,
   legend:[{label:"One cholera death (black bar)",color:"#1A1A1A",shape:"line"},{label:"Water pump (dot marked PUMP)",color:"#1A1A1A",shape:"circle"}],
   sourceNote:"Scan of John Snow's 1854 map, georeferenced as a tile layer."}
];
const BOOKMARKS=[
  {name:"Snow's map",xmin:-0.14413,ymin:51.50911,xmax:-0.13073,ymax:51.51686},
  {name:"Broad Street pump",xmin:-0.1395,ymin:51.5118,xmax:-0.1337,ymax:51.5148},
  {name:"All data",xmin:-0.1425,ymin:51.5095,xmax:-0.1305,ymax:51.5172}
];

/* ---------- sections ---------- */
const SECTIONS=[
 {id:"ask",title:"Ask",question:"Where did cholera deaths cluster in Soho in 1854?",layers:["snow"],bookmark:"Snow's map",
  intro:`<p>On 31 August 1854 cholera broke out in Soho, a crowded district of London. About 500 people died within ten days. Most doctors blamed "bad air." Dr. John Snow suspected something else, and he mapped every death to find out.</p>`,
  tasks:[
   {type:"custom",render:(c,api)=>restoreStyle(api,"ask")},
   {type:"button",id:"askMap",points:5,label:"Go to Soho + show Snow's Cholera Map",bookmark:"Snow's map",layersOn:["snow"],layersOff:["cases","pumps"],
    callout:"<b>Map:</b> Only <b>Snow's Cholera Map</b> is turned on. Pan and zoom around Soho. Each short black bar (hash mark) stands for one death at that address, so a tall stack of bars means many deaths in one house."},
   {type:"mcq",id:"askMiasma",points:10,question:"In 1854, most doctors believed cholera spread through…",
    choices:["Contaminated drinking water","Miasma: foul, polluted air","Insect bites","Touching a sick person's clothing"],correct:1,
    explain:"The miasma theory blamed bad air. Snow had argued since 1849 that cholera spread through water, an unpopular idea at the time."},
   {type:"mcq",id:"askWhere",points:10,question:"Pan and zoom around Snow's map. Are there areas or specific addresses with the most documented deaths?",
    choices:["No. The hash marks are spread evenly across the map","Yes. The tallest stacks cluster in the middle of the map, around Broad Street","Yes. Most deaths are along the outer edges of the map","Yes. Deaths are concentrated beside the River Thames"],correct:1,
    explain:"The longest stacks of bars crowd along and around Broad Street in the centre of the map and thin out toward the edges. Spotting a cluster is a start, but it does not explain why it is there."}
  ]},
 {id:"acquire",title:"Acquire",question:"Which addresses recorded the most deaths?",layers:["snow"],bookmark:"Snow's map",
  tasks:[
   {type:"custom",render:(c,api)=>restoreStyle(api,"acquire")},
   {type:"button",id:"acqCases",points:5,label:"Turn on Cholera Cases",layersOn:["cases"],
    callout:"<b>Layers:</b> Turn on <b>Cholera Cases</b>. Its points sit on the same addresses as Snow's hash marks, but these points are interactive."},
   {type:"custom",id:"acqClick",points:10,title:"Open a pop-up",text:"Click any red Cholera Cases point. What does its pop-up tell you?",render:caseClickTask},
   {type:"custom",id:"acqTable",points:10,title:"Show the attribute table",text:"The attribute table lists every Cholera Cases record. Sort the <b>Deaths</b> column from high to low.",render:tableTask},
   {type:"mcq",id:"acqMost",points:10,question:"With the table sorted by Deaths (high to low), which address recorded the most deaths?",
    choices:["45 Broadwick Street","5 Greens Court","1 Kingly Court","29 Saint Annes Court"],correct:0,
    explain:"45 Broadwick Street recorded 18 deaths, twice as many as any other address. Next came 5 Greens Court (9), then 6 Berwick Street and 1 Kingly Court (8 each). The data uses today's street names: Broad Street is now Broadwick Street."},
   {type:"order",id:"acqRank",points:15,title:"Rank the addresses",hint:"Use the table to put these addresses in order from most to fewest deaths, then check.",
    items:[{t:"45 Broadwick Street",d:"18 deaths"},{t:"5 Greens Court",d:"9 deaths"},{t:"7 Ingestre Place",d:"7 deaths"},{t:"83 Berwick Street",d:"5 deaths"},{t:"69 Beak Street",d:"1 death"}]},
   {type:"mcq",id:"acqWhy",points:10,question:"The table shows which addresses were hit hardest. What can it <i>not</i> tell you?",
    choices:["How many deaths each address had","Which addresses had the most deaths","Why those addresses were hit so hard","The street address of each record"],correct:2,
    explain:"The table describes what happened and where, not why. To look for a cause you need to see the pattern on the map and compare it with other features, such as water pumps."}
  ]},
 {id:"explore",title:"Explore",question:"How can a heat map reveal the centre of the outbreak?",layers:["snow","cases"],bookmark:"Snow's map",
  intro:`<p>Hundreds of overlapping points are hard to read. A heat map turns them into a smooth surface that shows where deaths were most concentrated.</p>`,
  tasks:[
   {type:"custom",render:(c,api)=>restoreStyle(api,"explore")},
   {type:"custom",id:"expStyle",points:15,title:"Style the Cholera Cases layer",text:"Use the Styles pane: add the <b>Deaths</b> field so each address counts by its number of deaths, try the size style, then choose <b>Heat map</b> and select <b>Done</b>.",render:stylesTask},
   {type:"mcq",id:"expColors",points:10,question:"On the heat map, what does the brightest yellow area show?",
    choices:["The single address with the most deaths","The densest concentration of deaths, counting how close the cases are and how many deaths each had","The locations of the water pumps","Where Snow lived"],correct:1,
    explain:"Purple and red mark lower densities; yellow marks the densest concentration of deaths. Because the style uses the Deaths field, an address with 18 deaths counts far more than an address with one."},
   {type:"custom",id:"expProps",points:10,title:"Let Snow's map show through",text:"In the Properties pane, set <b>Blending</b> to <b>Multiply</b> (under Darken) and <b>Transparency</b> to <b>25%</b>.",render:propertiesTask},
   {type:"mcq",id:"expBlend",points:10,question:"Why change the heat map's blending to Multiply?",
    choices:["It deletes Snow's hash marks","It mixes the heat colours with Snow's map, so his streets and hash marks stay visible underneath","It makes the heat map cover a bigger area","It counts each death twice"],correct:1,
    explain:"Multiply darkens the colours where the layers overlap instead of covering them, so you can read Snow's original map and the heat map together."}
  ]},
 {id:"analyze",title:"Analyze",question:"Which water pump was the likely source of the outbreak?",layers:["snow","cases"],bookmark:"Snow's map",
  tasks:[
   {type:"custom",render:(c,api)=>restoreStyle(api,"analyze")},
   {type:"button",id:"anaPumps",points:5,label:"Turn on Water Pumps",layersOn:["pumps"],
    callout:"<b>Layers:</b> Turn on <b>Water Pumps</b>. In 1854 most homes in Soho had no running water, so people carried drinking water from public pumps."},
   {type:"click",id:"anaPump",points:15,layer:"pumps",title:"Find the suspect pump",
    text:"Click the pump closest to the brightest yellow area of the heat map.",banner:"<b>Map task:</b> click the blue pump nearest the brightest yellow area",
    test:c=>/broadwick/i.test(c.name),
    success:c=>`<b>${c.name}</b>: the <b>Broad Street pump</b>. Broad Street has since been renamed Broadwick Street. It sits right in the core of the outbreak.`,
    fail:c=>`${c.name} is a pump, but not the one nearest the hottest part of the heat map. Look in the yellow core.`},
   {type:"custom",id:"anaRing",points:15,title:"Distance rings",text:"How tightly do the deaths crowd around the Broad Street pump? Drag the slider to change the ring around the pump. Find the <b>smallest</b> ring that holds at least <b>three-quarters (75%)</b> of all deaths, then lock it in.",render:ringTask},
   {type:"mcq",id:"anaNearest",points:10,question:"A few deaths happened in houses that were closer to a different pump. When Snow investigated those households, what did he find?",
    choices:["Many had chosen to fetch water from Broad Street anyway. Some families preferred its water, and some victims were children whose school was near the pump","They had all recently travelled abroad","They drank only beer","Their houses had no windows, so bad air collected inside"],correct:0,
    explain:"Of 10 deaths in houses nearer another pump, Snow found that five families preferred the Broad Street water and three victims were children who went to school near it. The exceptions supported his idea rather than weakening it."},
   {type:"button",id:"anaAll",points:5,label:"Zoom out to see all the data",bookmark:"All data",
    callout:"<b>Bookmark:</b> Close any pop-up and zoom out until all the data is visible. Notice how the heat fades with distance from Broad Street."}
  ]},
 {id:"act",title:"Act",question:"What should the parish do, and how strong is the evidence?",layers:["snow","cases","pumps"],bookmark:"Broad Street pump",
  intro:`<p>On 7 September 1854 Snow presented his evidence to the parish Board of Guardians of St James's. The next day the handle was removed from the Broad Street pump so no one could use it, and the outbreak subsided.</p>`,
  tasks:[
   {type:"custom",render:(c,api)=>restoreStyle(api,"act")},
   {type:"mcq",id:"actDecline",points:10,question:"Deaths fell after the pump handle was removed. Why can't the decline be credited to the pump alone?",
    choices:["Many residents had fled the neighbourhood, so fewer people were left to catch the disease","Cholera cannot spread in September","Other pumps were closed on the same day","The map was published before the outbreak"],correct:0,
    explain:"Snow himself noted that many people had left the area, which may also explain why deaths fell. Correlation on a map is strong evidence, but not proof on its own."},
   {type:"mcq",id:"actBrewery",points:10,question:"No workers at the brewery on Broad Street, a few steps from the pump, caught cholera. Which explanation fits Snow's theory?",
    choices:["They received a daily beer allowance and did not drink the pump water","The air inside the brewery was cleaner","They had been vaccinated against cholera","They all lived far from Soho"],correct:0,
    explain:"The brewery workers drank beer, not water from the pump. People close to the pump who avoided its water stayed healthy, which pointed to the water rather than the air."},
   {type:"order",id:"actTimeline",points:15,title:"Put the investigation in order",
    items:[{t:"Snow publishes his theory that cholera spreads through water",d:"1849"},{t:"Cholera breaks out in Soho",d:"31 Aug 1854"},{t:"Snow presents his evidence to the parish Board of Guardians",d:"7 Sept 1854"},{t:"The Broad Street pump handle is removed",d:"8 Sept 1854"},{t:"Snow publishes the second edition of his book, with his map",d:"1855"},{t:"Scientists isolate the cholera bacterium",d:"1883"}]},
   {type:"free",id:"act",points:25,title:"Memo to the Board of Guardians",minWords:60,buttonLabel:"Log argument",doneLabel:"Argument logged. Download your answers below.",
    text:"It is 7 September 1854. Choose your recommendation, then write a memo to the parish Board of Guardians. Use at least two pieces of evidence from the map (the heat map, the pump locations, the distance rings or the hardest-hit addresses) and name one limitation of the map as evidence.",
    options:["Remove the handle of the Broad Street pump now","Wait and collect more evidence first","Clean the streets to remove bad air"],
    label:"Write your memo",placeholder:"To the Board of Guardians of St James's: I recommend … because the map shows …"}
  ]}
];

/* ---------- activity ---------- */
window.ACTIVITY={
  slug:"cholera-outbreak-1854",
  title:"Map a Historic Cholera Outbreak",
  subtitle:"Soho, London, 1854 · based on the Learn ArcGIS lesson by Esri",
  storageKey:"choleraOutbreak1854State",
  theme:{"--header":"#6B1E24","--header-rule":"#B4842D","--accent":"#5A1A1F","--accent-hover":"#6B1E24","--callout":"#F6E9E4"},
  map:{basemap:"gray-vector",center:[-0.1366,51.5131],zoom:17,minZoom:14,maxZoom:20,measure:true,measureUnit:"meters"},
  bookmarks:BOOKMARKS,
  layers:LAYERS,
  badges:[{name:"Observer"},{name:"Record Keeper"},{name:"Heat Mapper"},{name:"Pump Detective"},{name:"Health Officer"}],
  sections:SECTIONS,
  summaryTitle:"Your case notes",
  onMapReady:(api)=>{ addSnowMap(api).then(()=>{ readyResolve(); api.renderLegend(); }); },
  onExplore:(api)=>{ mapReady.then(()=>setCaseStyle(api,"heat",{blend:"multiply",opacity:.75})); },
  sources:`<h2>Sources and data</h2>
  <h3>Map layers</h3>
  <table><tr><th>Layer</th><th>Source</th><th>Notes</th></tr>
    <tr><td>Basemap</td><td>Esri Light Gray Canvas</td><td>Loaded through the ArcGIS Maps SDK for JavaScript 4.30.</td></tr>
    <tr><td>Water Pumps</td><td><code>${PUMPS_URL}</code></td><td>13 public pumps. Falls back to a built-in copy if the service is unavailable.</td></tr>
    <tr><td>Cholera Cases</td><td><code>${CASES_URL}</code></td><td>322 address records, 578 deaths in all. Falls back to a built-in copy if the service is unavailable.</td></tr>
    <tr><td>Snow's Cholera Map</td><td><code>${SNOW_URL}</code></td><td>Tile layer of John Snow's map, published in <i>On the Mode of Communication of Cholera</i> (2nd ed., London, 1855); the service credits the lithograph to C.F. Cheffins.</td></tr>
  </table>
  <p>All three layers come from the lesson's ArcGIS Online web map <a href="https://edresources.maps.arcgis.com/apps/mapviewer/index.html?webmap=8863ffcc86134abfac5573e96e0bf336" target="_blank" rel="noopener">Cholera Outbreak, 1854</a>. The heat map, distance rings and attribute table are calculated in this app from the same data.</p>
  <h3>References</h3>
  <ul>
    <li>Esri, Learn ArcGIS: <a href="https://learn.arcgis.com/en/projects/map-a-historic-cholera-outbreak" target="_blank" rel="noopener">Map a historic cholera outbreak</a>.</li>
    <li>John Snow, <i>On the Mode of Communication of Cholera</i>, 2nd ed. (London, 1855).</li>
    <li>Centers for Disease Control and Prevention, <a href="https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5334a1.htm" target="_blank" rel="noopener">"150th Anniversary of John Snow and the Pump Handle"</a>, <i>MMWR</i> 53(34), 2004.</li>
    <li>London Museum, <a href="https://www.londonmuseum.org.uk/collections/london-stories/john-snow-cholera-broad-street-pump/" target="_blank" rel="noopener">John Snow: Cholera and the Broad Street pump</a>.</li>
    <li>UCLA Fielding School of Public Health, <a href="https://epi-snow.ph.ucla.edu/" target="_blank" rel="noopener">John Snow site</a>.</li>
  </ul>`,
  teacher:`<p>Converted from Esri's Learn ArcGIS lesson <i>Map a historic cholera outbreak</i> and its web map <i>Cholera Outbreak, 1854</i>. Students explore John Snow's map, read pop-ups and an attribute table, build a heat map weighted by deaths, and identify the Broad Street pump as the likely source. It fits units on medical geography and disease diffusion, spatial patterns and density, and the use of maps as evidence.</p>
  <h3>Things to know</h3>
  <ul>
    <li><b>No ArcGIS account is needed.</b> The original lesson asks students to sign in and save a copy of the map; those steps are removed. Everything the lesson does in Map Viewer (turning on layers, pop-ups, the attribute table, Styles, Blending and Transparency) happens inside the app.</li>
    <li>All three layers load live from the lesson's web map. If the Cholera Cases or Water Pumps service is down, the app uses a built-in copy of the same data; Snow's scanned map has no substitute and is marked unavailable.</li>
    <li>The data uses modern street names. Broad Street is now Broadwick Street; the pump record is "43 Broadwick Street." Some addresses appear more than once in the attribute table, so students should read the Deaths column rather than count rows.</li>
    <li>The Analyze "Distance rings" task uses straight-line distance. Snow also reasoned with walking distance along streets; a good discussion point.</li>
    <li>Students' progress saves in their browser. The Act section ends with a memo and a <b>Download my answers</b> text file they can turn in.</li>
    <li>Scoring: 5–15 points per task, 25 for the memo, plus streak bonuses. Explore mode shows the finished heat map with every layer on, which works well for a projector walkthrough.</li>
  </ul>
  <h3>Then try this</h3>
  <ul>
    <li>Discuss why Snow's map became better known than his written argument, and what a map can and cannot prove.</li>
    <li>Have students compare the 1854 outbreak with a modern outbreak map. What has changed in how data is collected and shared?</li>
    <li>Use the measure tool to compare the straight-line distance from a hard-hit address to the Broad Street pump with the route along the streets.</li>
  </ul>`
};
})();
