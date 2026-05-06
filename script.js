// 全局变量
let currentQuestion = 1;
let answers = {};
let scores = {
    'E/I': 0,
    'S/N': 0,
    'T/F': 0,
    'J/P': 0
};

// 24题题库
const questions = [
    {
        id: 1, 
        dimension: 'E/I', 
        title: '策问 1・赋税更定篇', 
        icon: 'ledger',
        content: '户部尚书上书，奏请更定天下赋税新规，以舒民力、实国库。此事干系国本，朝野瞩目，朕当如何定夺？',
        options: [
            { text: '召集群臣开全朝大议，广纳百官谏言，待朝野共识已定，再下旨推行', score: 2 },
            { text: '先召内阁、六部主官合议，吸纳核心意见后，再赴朝堂公议定夺', score: 1 },
            { text: '奏折留中，令户部先出具细则清册，待三司详核后再行裁断', score: 0 },
            { text: '只召户部核心属官与心腹近臣，御书房密议敲定细则，再公示朝堂', score: -1 },
            { text: '独断定夺新规细则，直接下旨户部推行，无需群臣多议', score: -2 }
        ]
    },
    {
        id: 2, 
        dimension: 'E/I', 
        title: '策问 2・科举选士篇', 
        icon: 'exam',
        content: '三年一度科举殿试已毕，阅卷官已呈上前十名考卷，待朕钦点状元、榜眼、探花，朕当如何？',
        options: [
            { text: '召内阁、礼部、翰林院主官共同阅卷，合议名次后，朕再钦点', score: 2 },
            { text: '先亲阅前十名考卷，再征询主考官意见，综合后敲定名次', score: 1 },
            { text: '令阅卷官再行复核考卷，出具详细评语，三日后再呈御览', score: 0 },
            { text: '只召心腹阅卷官，单独听取考生背景与考卷优劣，再行定夺', score: -1 },
            { text: '亲阅全部考卷，独立评判优劣，直接钦点三鼎甲，无需旁人置喙', score: -2 }
        ]
    },
    {
        id: 3, 
        dimension: 'E/I', 
        title: '策问 3・边境战事篇', 
        icon: 'military',
        content: '边境急报，异族率部来犯，边军连战失利，朝野分为主战、主和两派，争执不下，朕当如何？',
        options: [
            { text: '召开军政大朝会，令武将、文臣各陈利弊，充分辩论后敲定平边方略', score: 2 },
            { text: '先召兵部与边镇主将密议核心方略，再赴朝堂公示，吸纳补充意见', score: 1 },
            { text: '令边军先固守城池，再遣使臣探查异族虚实，待详情回报再定战和', score: 0 },
            { text: '只召兵部尚书与心腹宿将，御书房密议后，直接给前线主帅下密旨', score: -1 },
            { text: '独定战和方略，直接授予前线主帅临机专断之权，无需朝堂公议', score: -2 }
        ]
    },
    {
        id: 4, 
        dimension: 'E/I', 
        title: '策问 4・灾荒赈灾篇', 
        icon: 'grain',
        content: '黄河决堤，三省受灾，百万灾民流离失所，地方急奏请拨赈灾粮款，朕当如何应对？',
        options: [
            { text: '每日临朝，召相关部门当众同步灾情、议定赈灾举措，安抚朝野人心', score: 2 },
            { text: '先定赈灾核心底线，再召相关主官合议细则，每日朝堂公示进度', score: 1 },
            { text: '先遣钦差赶赴灾区查勘灾情，据实回报后，再议定赈灾方案', score: 0 },
            { text: '只对接赈灾钦差与户部核心官员，每日御书房单独听密报，暗中调度粮款', score: -1 },
            { text: '直接给赈灾钦差下密旨，授予其钱粮调度全权，不对外公开赈灾细节', score: -2 }
        ]
    },
    {
        id: 5, 
        dimension: 'E/I', 
        title: '策问 5・纳谏听言篇', 
        icon: 'memorial',
        content: '监察御史上书，言辞激烈，直陈朕执政之过失，满朝哗然，朕当如何处置？',
        options: [
            { text: '朝堂之上当众宣读全折，令百官就此议论，朕当众给出回应与处置', score: 2 },
            { text: '先私下召见御史核实详情，再于朝堂之上公开处置，广纳谏言', score: 1 },
            { text: '奏折留中不发，令都察院核实折内所言，待查明后再行处置', score: 0 },
            { text: '留中奏折，私下召见御史，单独沟通其所言过失，再定后续处置', score: -1 },
            { text: '留中奏折，不对外公示，不与群臣议论，自行决断是否纳谏', score: -2 }
        ]
    },
    {
        id: 6, 
        dimension: 'E/I', 
        title: '策问 6・万国朝贺篇', 
        icon: 'jade',
        content: '元正佳节，万国来朝，属国使臣皆赴京朝贺，朕当如何安排？',
        options: [
            { text: '举办盛大朝会与庆功宴，与各国使臣、文武百官共贺佳节，彰显国威', score: 2 },
            { text: '举办正式朝会，接见所有使臣，再设宴款待核心属国使臣与百官', score: 1 },
            { text: '按祖制举办常规朝贺礼仪，礼毕即止，不额外举办宴席', score: 0 },
            { text: '只接见核心属国使臣，完成必要朝贺礼仪，其余使臣令礼部代为接待', score: -1 },
            { text: '令礼部代为主持所有朝贺事宜，朕不临朝、不接见使臣，退回深宫独处', score: -2 }
        ]
    },
    {
        id: 7, 
        dimension: 'S/N', 
        title: '策问 7・治国总纲篇', 
        icon: 'seal',
        content: '朕初登大宝，需定一朝治国之总纲，朕当以何为先？',
        options: [
            { text: '以稳为先，先核国库收支、整肃吏治、固边防、劝农桑，保当下国泰民安', score: 2 },
            { text: '先稳固当下民生国计，再逐步完善典章制度，为后世打好基础', score: 1 },
            { text: '先察前朝得失，再结合本朝实情，稳步推进治国方略', score: 0 },
            { text: '先定百年国运之框架，再逐步落地当下的民生举措', score: -1 },
            { text: '以开创为先，定制度革新、疆域拓展之宏图，为后世开万世太平', score: -2 }
        ]
    },
    {
        id: 8, 
        dimension: 'S/N', 
        title: '策问 8・大型工程篇', 
        icon: 'shovel',
        content: '工部上书，奏请开凿贯通南北的大运河，工程浩大，需耗数十年之功、百万民力，朕当如何定夺？',
        options: [
            { text: '驳回奏请，工程耗费过巨，恐加重百姓负担、动摇国本，优先解决当下民生', score: 2 },
            { text: '只开凿局部关键河段，解决当下漕运难题，不搞全线贯通的浩大工程', score: 1 },
            { text: '令工部先出具详细工费、民力核算清册，待三司详核可行性后再定', score: 0 },
            { text: '分段开凿，先试点核心河段，验证可行后，再逐步推进全线贯通', score: -1 },
            { text: '准奏全线开凿，哪怕耗费巨大，也要建成贯通千年的国运工程', score: -2 }
        ]
    },
    {
        id: 9, 
        dimension: 'S/N', 
        title: '策问 9・典章制度篇', 
        icon: 'law',
        content: '前朝典章制度已沿用百年，多有僵化疏漏，群臣奏请更定制度，朕当如何？',
        options: [
            { text: '沿用前朝成熟旧制，只修补现有漏洞，不做大的改动，保朝政平稳', score: 2 },
            { text: '只对现有制度做局部优化，不推翻核心框架，循章遵制', score: 1 },
            { text: '令翰林院、刑部详查旧制利弊，出具修订方案后再行定夺', score: 0 },
            { text: '保留旧制核心框架，对僵化部分做全面革新，适配本朝实情', score: -1 },
            { text: '推翻前朝旧制，重定本朝全新典章制度，开创一代之规制', score: -2 }
        ]
    },
    {
        id: 10, 
        dimension: 'S/N', 
        title: '策问 10・地方选官篇', 
        icon: 'official',
        content: '地方知府出缺，吏部呈上两名候选人，朕当钦点何人赴任？',
        options: [
            { text: '选深耕地方多年、熟稔钱粮刑狱、治下民生安定的实务型官员', score: 2 },
            { text: '选有地方治理实绩，同时略有长远思路的稳重型官员', score: 1 },
            { text: '令吏部出具二人详细履历与治绩考评，再行定夺', score: 0 },
            { text: '选有长远治理思路，同时能落地实务的开拓型官员', score: -1 },
            { text: '选有宏大治理思路、能开地方风气之先的创新型官员', score: -2 }
        ]
    },
    {
        id: 11, 
        dimension: 'S/N', 
        title: '策问 11・边防方略篇', 
        icon: 'wall',
        content: '北方异族常年扰边，虽无大举入侵，却屡犯边境劫掠百姓，朕当如何定边防方略？',
        options: [
            { text: '加固边境城池、训练边军、囤积粮草，做好日常防御，保边境安稳', score: 2 },
            { text: '以防御为主，定期出兵驱逐来犯之敌，不深入敌境作战', score: 1 },
            { text: '令边镇主将出具边防方略，兵部详核后，再行定夺', score: 0 },
            { text: '制定阶段性作战计划，逐步削弱异族实力，消除边境隐患', score: -1 },
            { text: '制定长远灭敌战略，举全国之力北伐，彻底解决异族百年边患', score: -2 }
        ]
    },
    {
        id: 12, 
        dimension: 'S/N', 
        title: '策问 12・农桑革新篇', 
        icon: 'grain-ear',
        content: '农官上书，献全新农耕之法，称可使粮食产量翻倍，此前无大规模推行先例，朕当如何？',
        options: [
            { text: '驳回奏请，无成熟先例可循，恐误农时、伤民生，沿用现有成熟农耕之法', score: 2 },
            { text: '只在一县之内小范围试点，观察一整年收成，再决定是否推广', score: 1 },
            { text: '令农官先出具详细的耕种细则，在皇家御田试点后再行定夺', score: 0 },
            { text: '在数省之内试点，验证成效后，再向全国逐步推广', score: -1 },
            { text: '立刻向全国推行此新法，相信其能彻底解决本朝粮食短缺之困', score: -2 }
        ]
    },
    {
        id: 13, 
        dimension: 'T/F', 
        title: '策问 13・宗室谋逆篇', 
        icon: 'broken-jade',
        content: '朕的亲胞弟，暗中勾结朝臣、图谋不轨，谋逆证据确凿，按律当诛，朕当如何处置？',
        options: [
            { text: '严格按律法处置，谋逆乃十恶不赦之罪，哪怕是至亲，也当明正典刑，以正国法', score: 2 },
            { text: '按律定罪，念及手足亲情，赐其狱中自尽，保全皇室体面', score: 1 },
            { text: '令宗人府、刑部联合会审，核实所有证据后，再行定罪', score: 0 },
            { text: '免其死罪，废为庶人，终身圈禁于宗人府，保全其性命', score: -1 },
            { text: '念及手足亲情，只削其爵位、收其兵权，不予重罚，仍保留其宗室待遇', score: -2 }
        ]
    },
    {
        id: 14, 
        dimension: 'T/F', 
        title: '策问 14・大旱赈灾篇', 
        icon: 'water',
        content: '数省遭遇百年大旱，颗粒无收，灾民嗷嗷待哺，国库却空虚，军饷、赈灾款难以两全，朕当如何？',
        options: [
            { text: '优先保障军饷与边防粮草，再以剩余国库钱粮赈灾，确保王朝根基不动摇', score: 2 },
            { text: '先保障七成军饷，剩余国库钱粮尽数用于赈灾，两边兼顾', score: 1 },
            { text: '令户部核算国库明细，同时号召百官捐俸，补充赈灾款项', score: 0 },
            { text: '优先保障赈灾粮草，哪怕暂时拖欠部分军饷，也要先保全灾民性命', score: -1 },
            { text: '倾尽国库所有存粮赈灾，哪怕军饷全数拖欠，也绝不能让百姓饿死', score: -2 }
        ]
    },
    {
        id: 15, 
        dimension: 'T/F', 
        title: '策问 15・战败定罪篇', 
        icon: 'whip',
        content: '追随朕开国的宿将，一生战功赫赫，此次率军出征，却因轻敌冒进打了大败仗，损兵折将，按军法当斩，朕当如何处置？',
        options: [
            { text: '严格按军法处置，战败之罪，不因过往功勋而赦免，一视同仁，以正军法', score: 2 },
            { text: '按律定罪，念其开国功勋，免去死罪，革去所有官职与爵位，贬为庶人', score: 1 },
            { text: '令兵部、三法司联合会审，核实战败详情与罪责，再行定罪', score: 0 },
            { text: '免去死罪，只降职削爵，令其戴罪立功，镇守边境', score: -1 },
            { text: '念其一生为国征战、功勋卓著，不予责罚，只稍加申斥，仍保留其官职兵权', score: -2 }
        ]
    },
    {
        id: 16, 
        dimension: 'T/F', 
        title: '策问 16・律法修订篇', 
        icon: 'brush',
        content: '群臣奏请修订本朝律法，朕当以何为修法之核心原则？',
        options: [
            { text: '律法当公平公正，赏罚分明，不分贵贱亲疏，一断于法，绝不容情', score: 2 },
            { text: '律法当严宽相济，重罪必罚，轻罪可恕，以法度为核心，兼顾人情', score: 1 },
            { text: '令刑部、翰林院详查历朝律法得失，出具修法大纲后再行定夺', score: 0 },
            { text: '律法当以仁政为本，宽刑省狱，给百姓改过自新的机会，兼顾法度', score: -1 },
            { text: '律法当以民心为本，体恤百姓疾苦，宁宽勿严，彰显帝王仁心', score: -2 }
        ]
    },
    {
        id: 17, 
        dimension: 'T/F', 
        title: '策问 17・拦驾告御状篇', 
        icon: 'petition',
        content: '朕出巡途中，有百姓拦御驾告御状，状告当地知府贪赃枉法、鱼肉百姓，群情激愤，朕当如何处置？',
        options: [
            { text: '将此案交由刑部，按正常流程核查办理，证据确凿后再按律法处置，不越级干预', score: 2 },
            { text: '令刑部立刻派钦差核查此案，待查清事实后，严格按律法处置', score: 1 },
            { text: '先将被告知府暂行解职，待查清案情后，再行定夺', score: 0 },
            { text: '亲自过问此案，责令当地官员立刻安抚百姓，限时查清案情，给百姓一个交代', score: -1 },
            { text: '当场将知府拿下，亲自为百姓做主，严惩贪官，安抚民心', score: -2 }
        ]
    },
    {
        id: 18, 
        dimension: 'T/F', 
        title: '策问 18・心腹弹劾篇', 
        icon: 'tablet',
        content: '朕最信任的心腹大臣，被满朝文武联名弹劾，称其结党营私、贪赃枉法，但弹劾证据多为捕风捉影，并无实据，朝野舆论汹汹，朕当如何处置？',
        options: [
            { text: '暂停其所有职务，令三法司彻查此事，不管是谁，有错必罚，无错则澄清，绝不被舆论裹挟', score: 2 },
            { text: '令其暂避风头，回乡休养，待查清此事后，再定是否起复', score: 1 },
            { text: '令都察院暗中核查弹劾内容，待查明虚实后，再行处置', score: 0 },
            { text: '公开力保这位大臣，驳回弹劾奏折，安抚其情绪，同时平息百官舆论', score: -1 },
            { text: '力保这位大臣，严惩带头弹劾的官员，绝不寒了心腹近臣的心', score: -2 }
        ]
    },
    {
        id: 19, 
        dimension: 'J/P', 
        title: '策问 19・御驾亲征篇', 
        icon: 'horse',
        content: '异族大举入侵，边军节节败退，朕决定御驾亲征，鼓舞军心，朕当如何安排？',
        options: [
            { text: '制定详细的行军路线、粮草调度、攻防部署、撤军预案，所有环节严格按计划执行', score: 2 },
            { text: '制定核心作战计划与行军路线，部分细节交由前线将领灵活调整', score: 1 },
            { text: '令兵部与主将制定详细的亲征方略，朕审核后再行定夺', score: 0 },
            { text: '只定下核心作战目标，具体的行军、作战安排，交由前线将领临机决断', score: -1 },
            { text: '只定御驾亲征的大方向，不做固定计划，根据战场形势，随时调整方略', score: -2 }
        ]
    },
    {
        id: 20, 
        dimension: 'J/P', 
        title: '策问 20・朝规理政篇', 
        icon: 'ceremonial',
        content: '朕初登大宝，需定日常临朝理政之规制，朕当如何设定？',
        options: [
            { text: '定死严格的朝会规制，每日按时临朝、按时批阅奏折，所有政务按固定流程办理', score: 2 },
            { text: '固定每日临朝，遇紧急事务可灵活调整，日常政务按流程办理', score: 1 },
            { text: '按祖制设定朝会规制，再根据本朝实情略作调整', score: 0 },
            { text: '不固定每日临朝，有事则召集群臣议事，无事则免朝，政务随到随办', score: -1 },
            { text: '不设固定的朝会流程与理政时限，不被僵化规则束缚，随心处置朝政', score: -2 }
        ]
    },
    {
        id: 21, 
        dimension: 'J/P', 
        title: '策问 21・立储定国本篇', 
        icon: 'crown',
        content: '朕已入中年，群臣屡屡上书，请立太子，以定国本，朕当如何？',
        options: [
            { text: '早日定下太子人选，为其设立东宫官属，悉心培养，建立完整的储君制度，确保江山平稳传承', score: 2 },
            { text: '定下太子人选，悉心培养，同时也给其他皇子历练的机会', score: 1 },
            { text: '令宗人府、翰林院出具历朝立储规制，朕参考后再行定夺', score: 0 },
            { text: '不急于立储，长期观察各位皇子的品行能力，待合适时机再行定夺', score: -1 },
            { text: '终身不立太子，只在弥留之际，留下遗诏定继位人选，不留固定规制', score: -2 }
        ]
    },
    {
        id: 22, 
        dimension: 'J/P', 
        title: '策问 22・地震赈灾篇', 
        icon: 'debris',
        content: '地方突发特大地震，城池坍塌、百姓死伤无数，灾情不明，朕当如何下达赈灾指令？',
        options: [
            { text: '定下详细的赈灾流程、钱粮分配、人员调度、死伤抚恤细则，令地方严格按指令执行', score: 2 },
            { text: '定下赈灾核心细则，给地方官员少量灵活调整的权限，应对突发情况', score: 1 },
            { text: '先遣多路钦差赶赴灾区，查勘灾情详情，再制定详细的赈灾方案', score: 0 },
            { text: '定下赈灾的核心底线，给地方官员足够的钱粮调度权限，让其根据灾情灵活处置', score: -1 },
            { text: '只定下 "全力赈灾、安抚百姓" 的总原则，所有具体事宜，全权交由地方官员临机处置', score: -2 }
        ]
    },
    {
        id: 23, 
        dimension: 'J/P', 
        title: '策问 23・前朝修史篇', 
        icon: 'book',
        content: '朕下旨编撰前朝国史，以史为鉴，朕当如何给编撰团队定要求？',
        options: [
            { text: '定下严格的编撰体例、时间节点、内容规范、史料来源，令编撰团队严格按要求完成', score: 2 },
            { text: '定下核心编撰体例与时间节点，部分内容细节交由编撰团队灵活调整', score: 1 },
            { text: '令翰林院出具详细的修史方案，朕审核后再行定夺', score: 0 },
            { text: '只定下修史的核心原则，具体的体例、内容，交由编撰团队自主发挥', score: -1 },
            { text: '只下旨修史，不设任何固定规则，所有事宜全权交由编撰总裁官定夺', score: -2 }
        ]
    },
    {
        id: 24, 
        dimension: 'J/P', 
        title: '策问 24・朝堂党争篇', 
        icon: 'badge',
        content: '朝堂之上，文官分为两派，互相攻讦、党同伐异，已经影响到朝政正常运转，朕当如何处置？',
        options: [
            { text: '定下明确的朝堂规则，严禁党争，一旦发现结党营私，立刻严惩，把风险扼杀在源头', score: 2 },
            { text: '严令禁止党争，对带头攻讦的官员严加申斥，同时规范朝堂议事规则', score: 1 },
            { text: '令都察院暗中探查两派党争详情，查明核心人物后，再行处置', score: 0 },
            { text: '不直接禁止党争，对两派各有打有拉，让其互相制衡，不影响朝政即可', score: -1 },
            { text: '利用两派党争，平衡朝中各方势力，灵活调整朝堂格局，让皇权始终牢牢在握', score: -2 }
        ]
    }
];

// 题目对应小呼应元素的SVG图标
const questionIcons = {
    'ledger': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="20" y1="40" x2="80" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="20" y1="60" x2="80" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="20" y1="80" x2="80" y2="80" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'exam': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="40" x2="70" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="70" x2="50" y2="70" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'military': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'grain': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,30 L70,30 L75,50 L65,70 L35,70 L25,50 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="30" x2="30" y2="70" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="70" y1="30" x2="70" y2="70" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'memorial': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="20" width="40" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="40" x2="70" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="80" x2="70" y2="80" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'jade': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M50,20 L50,80" stroke="#1A1A1A" stroke-width="1"/>
        <path d="M20,50 L80,50" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'seal': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="40" height="40" rx="5" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <text x="50" y="55" font-size="8" text-anchor="middle" fill="#1A1A1A">玺</text>
    </svg>`,
    'shovel': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,80 L70,80 L60,30 L40,30 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="50" y1="30" x2="50" y2="20" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'law': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="25" y1="40" x2="75" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="25" y1="50" x2="75" y2="50" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="25" y1="60" x2="75" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="25" y1="70" x2="75" y2="70" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'official': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <text x="50" y="55" font-size="8" text-anchor="middle" fill="#1A1A1A">官</text>
    </svg>`,
    'wall': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,60 L80,60 L80,40 L20,40 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M30,40 L30,20 L70,20 L70,40" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="40" y1="20" x2="40" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="60" y1="20" x2="60" y2="60" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'grain-ear': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,20 L50,80" stroke="#1A1A1A" stroke-width="1"/>
        <path d="M50,30 Q30,40 40,60 Q35,80 50,70" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M50,30 Q70,40 60,60 Q65,80 50,70" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    </svg>`,
    'broken-jade': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M30,30 L70,70" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'water': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,30 Q40,20 60,30 Q80,40 80,60 Q80,80 60,80 Q40,80 20,60 Q20,40 20,30" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M30,50 Q40,40 50,50 Q60,60 70,50" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    </svg>`,
    'whip': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="50" x2="80" y2="50" stroke="#1A1A1A" stroke-width="1"/>
        <path d="M80,50 Q70,40 75,30 Q80,20 70,25" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    </svg>`,
    'brush': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="80" stroke="#1A1A1A" stroke-width="1"/>
        <path d="M40,80 Q50,90 60,80" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    </svg>`,
    'petition': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,20 L70,20 L80,30 L80,70 L70,80 L30,80 L20,70 L20,30 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="40" x2="70" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'tablet': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="35" y="20" width="30" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="35" y1="40" x2="65" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="35" y1="60" x2="65" y2="60" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'horse': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,60 Q40,50 50,60 Q60,70 70,60 Q80,50 90,60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M50,60 Q40,40 50,30 Q60,40 50,60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="60" x2="30" y2="70" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="70" y1="60" x2="70" y2="70" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'ceremonial': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="35" y="20" width="30" height="60" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="35" y1="40" x2="65" y2="40" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="35" y1="60" x2="65" y2="60" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="50" y1="20" x2="50" y2="10" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'crown': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,60 L80,60 L75,40 L60,50 L40,50 L25,40 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <line x1="30" y1="40" x2="30" y2="30" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="50" y1="40" x2="50" y2="20" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="70" y1="40" x2="70" y2="30" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'debris': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,70 L40,60 L50,70 L60,60 L70,70" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M35,60 L45,50 L55,60 L65,50" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M40,50 L50,40 L60,50" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    </svg>`,
    'book': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,20 L70,30 L70,70 L30,80 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M30,20 L30,80" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="40" y1="35" x2="60" y2="35" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="40" y1="45" x2="60" y2="45" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="40" y1="55" x2="60" y2="55" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="40" y1="65" x2="60" y2="65" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`,
    'badge': `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M40,40 L60,40 L60,60 L40,60 Z" stroke="#1A1A1A" stroke-width="1" fill="none"/>
        <path d="M40,50 L60,50" stroke="#1A1A1A" stroke-width="1"/>
        <path d="M50,40 L50,60" stroke="#1A1A1A" stroke-width="1"/>
    </svg>`
};

// 16型HDTI帝王匹配库
const emperorMatch = {
    'ENTJ': { name: '秦始皇 嬴政', title: '千古一帝・指挥官', image: './images/1-秦始皇entj.png' },
    'INTJ': { name: '汉武帝 刘彻', title: '定鼎乾坤・战略家', image: './images/2-汉武帝.png' },
    'ENFJ': { name: '唐太宗 李世民', title: '贞观天可汗・引路人', image: './images/3-唐太宗.png' },
    'INFJ': { name: '蜀昭烈帝 刘备', title: '仁义昭烈・理想者', image: './images/4-刘备.png' },
    'ESTJ': { name: '明太祖 朱元璋', title: '洪武定规・执行官', image: './images/5-朱元璋.png' },
    'ISTJ': { name: '清圣祖 玄烨', title: '康熙守业・检查官', image: './images/6-康熙.png' },
    'ESFJ': { name: '宋仁宗 赵祯', title: '仁宗仁治・执政官', image: './images/7-宋仁宗.png' },
    'ISFJ': { name: '汉光武帝 刘秀', title: '光武中兴・守护者', image: './images/8-刘秀.png' },
    'ESTP': { name: '汉高祖 刘邦', title: '草根开国・创业者', image: './images/9-刘邦.png' },
    'ISTP': { name: '宋太祖 赵匡胤', title: '黄袍加身・巧匠', image: './images/10-赵匡胤.png' },
    'ESFP': { name: '清高宗 弘历', title: '盛世风流・表演者', image: './images/11-弘历.png' },
    'ISFP': { name: '宋徽宗 赵佶', title: '书画圣手・艺术家', image: './images/12-宋徽宗.png' },
    'ENTP': { name: '魏武帝 曹操', title: '乱世奸雄・智多星', image: './images/13-曹操.png' },
    'INTP': { name: '明世宗 嘉靖 朱厚熜', title: '深宫控权・逻辑学家', image: './images/14-嘉靖.png' },
    'ENFP': { name: '隋炀帝 杨广', title: '大运河筑梦・追梦人', image: './images/15-杨广.png' },
    'INFP': { name: '明惠宗 建文帝 朱允炆', title: '建文仁心・纯粹者', image: './images/16-朱允炆.png' }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 加载本地存储的数据
    loadSavedData();
    
    // 绑定事件
    bindEvents();
    
    // 初始化答题页面
    updateQuestion();
    
    // 生成人格类型卡片
    generatePersonalityCards();
    
    // 初始化交互效果
    initInteractions();
});

// 绑定事件
function bindEvents() {
    // 开始测试按钮
    document.getElementById('start-btn').addEventListener('click', function() {
        // 显示加载印章动画
        const loadingSeal = document.getElementById('loading-seal');
        loadingSeal.style.display = 'block';
        
        // 1秒后跳转到答题页面
        setTimeout(function() {
            loadingSeal.style.display = 'none';
            showPage('question-page');
            updateNavActive('question-page');
        }, 1000);
    });
    
    // 上一题按钮
    document.getElementById('prev-btn').addEventListener('click', function() {
        if (currentQuestion > 1) {
            currentQuestion--;
            prevPageAnimation();
            playSound('page-turn');
        }
    });
    
    // 下一题按钮
    document.getElementById('next-btn').addEventListener('click', function() {
        if (currentQuestion < 24) {
            currentQuestion++;
            nextPageAnimation();
            playSound('page-turn');
        } else {
            // 完成测试，计算结果
            calculateResult();
            showPage('result-page');
            updateNavActive('result-page');
            playSound('scroll-open');
        }
    });
    
    // 选项按钮
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他选项的选中状态
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            // 添加当前选项的选中状态
            this.classList.add('selected');
            
            // 保存答案
            const score = parseInt(this.dataset.score);
            answers[currentQuestion] = score;
            
            // 更新分数
            updateScores();
            
            // 保存到本地存储
            saveToLocalStorage();
        });
    });
    
    // 分享按钮
    document.getElementById('share-btn').addEventListener('click', function() {
        shareResult();
    });
    
    // 导航栏项目点击事件
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            showPage(targetPage);
            updateNavActive(targetPage);
        });
    });
    
    // 导航栏开始测试按钮
    document.getElementById('start-test-btn').addEventListener('click', function() {
        // 显示加载印章动画
        const loadingSeal = document.getElementById('loading-seal');
        loadingSeal.style.display = 'block';
        
        // 1秒后跳转到答题页面
        setTimeout(function() {
            loadingSeal.style.display = 'none';
            showPage('question-page');
            updateNavActive('question-page');
        }, 1000);
    });
    
    // 导航栏查看测试按钮
    document.getElementById('view-test-btn').addEventListener('click', function() {
        showPage('test-description');
        updateNavActive('test-description');
    });
    
    // 人格预览弹窗关闭按钮
    document.getElementById('modal-close-btn').addEventListener('click', closePersonalityModal);
    
    // 点击弹窗背景关闭弹窗
    document.getElementById('personality-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePersonalityModal();
        }
    });
}

// 更新导航栏激活状态
function updateNavActive(pageId) {
    // 移除所有导航栏项目的激活状态
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 添加当前页面的激活状态
    const activeItem = document.querySelector(`.navbar-item[data-page="${pageId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// 生成人格类型卡片
function generatePersonalityCards() {
    const personalityGrid = document.querySelector('.personality-grid');
    if (!personalityGrid) return;
    
    // 清空现有内容
    personalityGrid.innerHTML = '';
    
    // 遍历帝王匹配库，生成卡片
    for (const [type, emperor] of Object.entries(emperorMatch)) {
        const card = document.createElement('div');
        card.className = 'personality-card';
        card.innerHTML = `
            <div class="emperor-image">
                <img src="${emperor.image}" alt="${emperor.name}">
            </div>
            <h3>${type}</h3>
            <h4>${emperor.title}</h4>
            <p>${emperor.name}</p>
        `;
        
        // 添加点击事件
        card.addEventListener('click', function() {
            openPersonalityModal(type, emperor);
        });
        
        personalityGrid.appendChild(card);
    }
}

// 打开人格预览弹窗
function openPersonalityModal(type, emperor) {
    const modal = document.getElementById('personality-modal');
    const modalImage = document.getElementById('modal-image');
    const modalType = document.getElementById('modal-type');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDescription = document.getElementById('modal-description');
    
    // 设置弹窗内容
    modalImage.src = emperor.image;
    modalType.textContent = type;
    modalTitle.textContent = emperor.name;
    modalSubtitle.textContent = emperor.title;
    
    // 生成人格描述
    const description = generatePersonalityDescription(type, emperor);
    modalDescription.textContent = description;
    
    // 显示弹窗
    modal.classList.add('active');
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
}

// 生成人格描述
function generatePersonalityDescription(type, emperor) {
    const traits = {
        'E': '外向、善于社交、喜欢与人交流',
        'I': '内向、喜欢独处、善于思考',
        'S': '注重实际、关注细节、务实',
        'N': '富有想象力、关注未来、富有远见',
        'T': '理性、逻辑、注重事实',
        'F': '感性、情感丰富、注重人际关系',
        'J': '有条理、喜欢计划、注重秩序',
        'P': '灵活、适应性强、喜欢随性'
    };
    
    let description = `您的帝王人格类型对应${emperor.name}，${emperor.title}。`;
    description += `具有${traits[type[0]]}、${traits[type[1]]}、${traits[type[2]]}、${traits[type[3]]}的特质。`;
    description += '在治理国家方面展现出独特的领导风格，深受臣民爱戴。';
    
    return description;
}

// 关闭人格预览弹窗
function closePersonalityModal() {
    const modal = document.getElementById('personality-modal');
    modal.classList.remove('active');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

// 显示指定页面
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.remove('slide-in-right', 'slide-out-left', 'slide-in-left', 'slide-out-right', 'scroll-open');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
    
    // 添加页面切换动画
    if (pageId === 'question-page') {
        targetPage.classList.add('slide-in-right');
    } else if (pageId === 'result-page') {
        targetPage.classList.add('scroll-open');
    } else {
        targetPage.classList.add('slide-in-right');
    }
}

// 页面切换动画（下一题）
function nextPageAnimation() {
    const questionPage = document.getElementById('question-page');
    questionPage.classList.remove('slide-in-right', 'slide-out-left');
    questionPage.classList.add('slide-out-left');
    
    setTimeout(() => {
        questionPage.classList.remove('slide-out-left');
        questionPage.classList.add('slide-in-right');
        updateQuestion();
        showProgressStamp();
    }, 300);
}

// 页面切换动画（上一题）
function prevPageAnimation() {
    const questionPage = document.getElementById('question-page');
    questionPage.classList.remove('slide-in-right', 'slide-out-right');
    questionPage.classList.add('slide-out-right');
    
    setTimeout(() => {
        questionPage.classList.remove('slide-out-right');
        questionPage.classList.add('slide-in-left');
        updateQuestion();
    }, 300);
}

// 显示玉玺盖印动效
function showSealEffect(x, y) {
    const seal = document.createElement('div');
    seal.className = 'seal-effect';
    seal.innerHTML = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill="#9E2A2B" opacity="0.8"/>
        <text x="20" y="25" font-size="8" text-anchor="middle" fill="#F5F0E6">准</text>
    </svg>`;
    seal.style.left = `${x}px`;
    seal.style.top = `${y}px`;
    document.body.appendChild(seal);
    
    setTimeout(() => {
        seal.remove();
    }, 1000);
}

// 显示答题保存提示
function showSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'save-indicator';
    indicator.textContent = '存';
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.remove();
    }, 1000);
}

// 显示进度条阅字印
function showProgressStamp() {
    const progressBar = document.querySelector('.progress-bar');
    const stamp = document.createElement('div');
    stamp.className = 'progress-stamp';
    stamp.textContent = '阅';
    progressBar.appendChild(stamp);
    
    setTimeout(() => {
        stamp.remove();
    }, 1000);
}

// 播放音效（模拟）
function playSound(soundType) {
    // 这里可以添加实际的音效播放代码
    console.log(`Playing ${soundType} sound`);
}

// 初始化交互效果
function initInteractions() {
    // 为可点击元素添加clickable类
    document.querySelectorAll('button, .navbar-item, .option-btn').forEach(element => {
        element.classList.add('clickable');
    });
    
    // 为按钮添加点击动效
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            showSealEffect(e.clientX, e.clientY);
            playSound('seal');
        });
    });
    
    // 为选项按钮添加保存提示
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showSaveIndicator();
        });
    });
}

// 更新答题页面
function updateQuestion() {
    // 更新进度
    document.getElementById('progress-text').textContent = `第 ${currentQuestion} 题 / 共 24 题`;
    document.getElementById('progress-fill').style.width = `${(currentQuestion / 24) * 100}%`;
    
    // 更新题目
    const question = questions[currentQuestion - 1];
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('question-content-text').textContent = question.content;
    
    // 更新题目对应小呼应元素
    const decorationElement = document.getElementById('question-decoration');
    decorationElement.innerHTML = questionIcons[question.icon];
    
    // 更新选项
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        const option = question.options[index];
        const optionLetter = String.fromCharCode(65 + index);
        btn.textContent = `御批 ${optionLetter}：${option.text}`;
        btn.dataset.score = option.score;
        btn.classList.remove('selected');
        
        // 恢复已选择的选项
        if (answers[currentQuestion] === option.score) {
            btn.classList.add('selected');
        }
    });
    
    // 更新按钮状态
    document.getElementById('prev-btn').disabled = currentQuestion === 1;
    document.getElementById('next-btn').textContent = currentQuestion === 24 ? '查看结果' : '下一题';
}

// 更新分数
function updateScores() {
    // 重置分数
    scores = {
        'E/I': 0,
        'S/N': 0,
        'T/F': 0,
        'J/P': 0
    };
    
    // 计算分数
    for (let qid in answers) {
        const question = questions[qid - 1];
        scores[question.dimension] += answers[qid];
    }
}

// 计算结果
function calculateResult() {
    // 生成HDTI类型
    let hdtiType = '';
    
    // E/I维度
    hdtiType += scores['E/I'] > 0 ? 'E' : 'I';
    // S/N维度
    hdtiType += scores['S/N'] > 0 ? 'S' : 'N';
    // T/F维度
    hdtiType += scores['T/F'] > 0 ? 'T' : 'F';
    // J/P维度
    hdtiType += scores['J/P'] > 0 ? 'J' : 'P';
    
    // 获取匹配的帝王
    const emperor = emperorMatch[hdtiType];
    
    // 更新结果页面
    document.getElementById('emperor-name').textContent = emperor.name;
    document.getElementById('emperor-title').textContent = emperor.title;
    document.getElementById('hdti-type').textContent = `HDTI 类型：${hdtiType}`;
    
    // 简单的人格解读
    document.getElementById('interpretation').textContent = `您的帝王人格类型对应${emperor.name}，具有${emperor.title.split('・')[1]}的特质。在治理国家方面，您可能展现出${emperor.title.split('・')[1]}的领导风格，注重${hdtiType.includes('E') ? '对外交流' : '内部思考'}，${hdtiType.includes('S') ? '实际行动' : '长远规划'}，${hdtiType.includes('T') ? '理性决策' : '情感关怀'}，${hdtiType.includes('J') ? '有序规划' : '灵活应变'}。`;
    
    // 更新玉玺盖印文字
    const sealStamp = document.getElementById('seal-stamp');
    const emperorNameShort = emperor.name.split(' ')[0];
    sealStamp.innerHTML = `<svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#9E2A2B" opacity="0.8"/>
        <text x="50" y="55" font-size="14" text-anchor="middle" fill="#F5F0E6">${emperorNameShort}</text>
    </svg>`;
    
    // 应用帝王人格风格适配
    const resultCore = document.getElementById('result-core');
    const resultInterpretation = document.getElementById('result-interpretation');
    
    // 移除所有类型的CSS类
    resultCore.className = 'result-core';
    resultInterpretation.className = 'result-interpretation';
    
    // 添加对应类型的CSS类
    resultCore.classList.add(hdtiType.toLowerCase());
    resultInterpretation.classList.add(hdtiType.toLowerCase());
    
    // 添加帝王头像
    const emperorAvatar = document.getElementById('emperor-avatar');
    emperorAvatar.innerHTML = `<img src="${emperor.image}" alt="${emperor.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #9E2A2B;">`;
}

// 保存到本地存储
function saveToLocalStorage() {
    localStorage.setItem('hdti_answers', JSON.stringify(answers));
    localStorage.setItem('hdti_current_question', currentQuestion);
}

// 加载本地存储的数据
function loadSavedData() {
    const savedAnswers = localStorage.getItem('hdti_answers');
    const savedQuestion = localStorage.getItem('hdti_current_question');
    
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    }
    
    if (savedQuestion) {
        currentQuestion = parseInt(savedQuestion);
    }
    
    // 更新分数
    updateScores();
}

// 分享结果
function shareResult() {
    const emperorName = document.getElementById('emperor-name').textContent;
    const emperorTitle = document.getElementById('emperor-title').textContent;
    const hdtiType = document.getElementById('hdti-type').textContent;
    
    const shareText = `我的HDTI千古帝王人格测试结果：${emperorName} - ${emperorTitle}，${hdtiType}。快来测试你的专属帝王人格吧！`;
    
    // 检查是否支持Web Share API
    if (navigator.share) {
        navigator.share({
            title: 'HDTI千古帝王人格测试',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('分享失败:', err);
            // 降级方案
            fallbackShare(shareText);
        });
    } else {
        // 降级方案
        fallbackShare(shareText);
    }
}

// 降级分享方案
function fallbackShare(text) {
    // 创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    // 复制到剪贴板
    try {
        document.execCommand('copy');
        alert('分享内容已复制到剪贴板，请粘贴分享给好友！');
    } catch (err) {
        console.log('复制失败:', err);
        alert('请手动复制分享内容：\n' + text);
    } finally {
        document.body.removeChild(textArea);
    }
}