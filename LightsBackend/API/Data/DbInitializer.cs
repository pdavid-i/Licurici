using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(MyDbContext context, UserManager<User> userManager) {
            InitializeWords(context);
            InitializeThoughts(context);
            await InitializeUsers(userManager);
        }

        public static void InitializeWords(MyDbContext context) {
            if (context.Words.Any()) return;

            var words = new List<Word> {
                new Word {
                    Id = 1,
                    Name = "sardonic",
                    Definitions = ["Care exprimă batjocură necruțătoare sau satisfacție diabolică."],
                    Examples = ["Cand a văzut ca mi-a luat locul, mi-a aruncat un zâmbet sardonic."]          
                },
                new Word {
                    Id = 2,
                    Name = "pansiv",
                    Definitions = ["Cugetător, gânditor, meditativ, reflexiv."],
                    Examples = ["E deseori căzut pe gânduri, o fire pansivă."]          
                },
                new Word {
                    Id = 3,
                    Name = "desuet",
                    Definitions = ["Ieșit din uz, din modă, necorespunzător spiritului vremii."],
                    Examples = ["Am vzut-o la petrecere imbracata ciudat, avea un corset desuet. "]          
                },
                new Word {
                    Id = 4,
                    Name = "petulant",
                    Definitions = ["Care manifestă sau trădează o ardoare exuberantă (bruscă și adesea dezordonată)."],
                    Examples = ["Când s-a pomenit numele fratelui sau, a inceput sa ii privească cu o privire petulantă."]          
                },
                new Word {
                    Id = 5,
                    Name = "nostimadă",
                    Definitions = ["Lucru, întâmplare, glumă etc. plină de haz sau caraghioasă."],
                    Examples = ["Sotia sefului i-a intalnit amanta la birou cat era plecat, sa vezi ce nostimadă a iesit."]          
                },
                new Word {
                    Id = 6,
                    Name = "sordid",
                    Definitions = ["1. Extrem de murdar, dezgustător, repulsiv", "2. Meschin (despre persoane)"],
                    Examples = ["Aseară am văzut un șobolan în baie, m-am săturat de apartamentul ăsta sordid."]          
                },
                new Word {
                    Id = 7,
                    Name = "farafastâc",
                    Definitions = ["1. Podoabă sau ornament fără valoare, inutil.", "2. Moft, capriciu, fason"],
                    Examples = ["S-a întors de la piața de vechituri cu o sumedenie de farafastâcuri la gât."]          
                }, 
                new Word {
                    Id = 8,
                    Name = "logoree",
                    Definitions = ["Vorbire excesivă, rapidă, incoerentă, în stări de excitație psihică (beție, manie)"],
                    Examples = ["Nu o să ies cu Marcel la bere, nu am chef de încă o logoree despre fosta lui iubită."]          
                }, 
                new Word {
                    Id = 9,
                    Name = "dulcoare",
                    Definitions = ["Dulceață, bunătate, blândețe"],
                    Examples = ["Dimineața m-a trezit printr-o mângâiere plină de dulcoare"]          
                }, 
                new Word {
                    Id = 10,
                    Name = "complezent",
                    Definitions = ["Gata de a servi pe cineva, doritor de a face plăcere cuiva; serviabil, amabil"],
                    Examples = ["Aştepta să îi accept invitația cu o figură complezentă."]          
                }, 
                new Word {
                    Id = 11,
                    Name = "derizoriu",
                    Definitions = ["Neînsemnat, de nimic, ridicol"],
                    Examples = ["Mă doare capul deja, la masa asta se dezbat doar subiecte derizorii."]          
                }, 
                new Word {
                    Id = 12,
                    Name = "vivifiant",
                    Definitions = ["însuflețitor, dătător de putere."],
                    Examples = ["Nimic mai vivifiant decât prima bere la sfârșitul unei zile toride."]          
                }, 
                new Word {
                    Id = 13,
                    Name = "crapulos",
                    Definitions = ["Care este în decădere, în stare de mizerie morală; vicios, viciat, hoțesc"],
                    Examples = ["Revederea cu el mi-a lăsat un gust amar, avea un aer crapulos."]          
                }, 
                new Word {
                    Id = 14,
                    Name = "sibarit",
                    Definitions = ["(Persoană) care trăiește în lux, lene și desfrâu"],
                    Examples = ["Oprește-te, nu o să ascult lecții de morală de la un sibarit."]          
                }, 
                new Word {
                    Id = 15,
                    Name = "fee",
                    Definitions = ["ființă feminină supranaturală; zână"],
                    Examples = ["Când am văzut-o în rochia de vară a fost ca și cum mi s-ar ivit o fee în fața ochilor."]          
                }, 
                new Word {
                    Id = 16,
                    Name = "friabil",
                    Definitions = ["care se fărâmițează, se sparge ușor."],
                    Examples = ["N-a fost cea mai inspirată idee construieşti cu piatra asta friabilă."]          
                }, 
                new Word {
                    Id = 17,
                    Name = "sisific",
                    Definitions = ["Care cere eforturi îndelungate, istovitoare și zadarnice."],
                    Examples = ["Mi-au ajuns capriciile tale, e o muncă sisifică să te țin mulțumită."]          
                }, 
                new Word {
                    Id = 18,
                    Name = "argou",
                    Definitions = ["limbaj specific folosit de vagabonzi, infractori, etc. pentru a nu fi înțeleși de restul societății"],
                    Examples = ["Nu știu despre ce sticleți vorbeau, doar e mijlocul lui iulie?! Mă depășește argoul ăsta."]         
                }, 
                new Word {
                    Id = 19,
                    Name = "alegorie",
                    Definitions = ["Procedeu artistic constând în exprimarea unei idei abstracte prin mijloace concrete."],
                    Examples = ["Acest tablou e o alegorie excelentă a luptei omului cu greutățile vieții."]          
                }, 
                new Word {
                    Id = 20,
                    Name = "supliciu",
                    Definitions = [ "Tortură, caznă, chin fizic. (Figurat:) suferință morală, durere sufletească mare"],
                    Examples = ["Accidentarea la spate mi-a transformat viața într-un continuu supliciu."]          
                }, 
                new Word {
                    Id = 21,
                    Name = "impetuos",
                    Definitions = ["care dovedește o forță sau se manifestă ca o forță de nestăpânit; năvalnic."],
                    Examples = ["A trântit ușa în urmă și s-a repezit impetuos la adversar."]          
                }, 
                new Word {
                    Id = 22,
                    Name = "abscons",
                    Definitions = ["Greu de înțeles, ascuns, tainic, (voit) obscur."],
                    Examples = ["Ultimul său avertisment a părut neobișnuit de abscons."]          
                }, 
                new Word {
                    Id = 23,
                    Name = "a ebluisa",
                    Definitions = ["a întuneca vederea, a orbi, a lua ochii (datorită unei străluciri prea mari)", "2. a uimi, a surprinde, a ului."],
                    Examples = ["Când a ieșit pe scenă a ebluisat întregul public."]          
                }, 
                new Word {
                    Id = 24,
                    Name = "livresc",
                    Definitions = ["1. Întemeiat numai pe informația din cărți", "2. Folosit numai în cărți și în limbajul oamenilor culți."],
                    Examples = ["Nu am azuit de jumătate din cuvintele din limbajul tău livresc."]          
                }, 
                new Word {
                    Id = 25,
                    Name = "rancoare",
                    Definitions = ["ură, pizmă, animozitate, discordie, dușmănie"],
                    Examples = ["Toți ceilalți membrii ai consiliului l-au prionit cu priviri pline de rancoare."]          
                }, 
                new Word {
                    Id = 26,
                    Name = "expeditiv",
                    Definitions = ["care rezolvă cu ușurință lucrurile; prompt, iute"],
                    Examples = ["Noul meu avocat e foarte expeditiv, am avut noroc să-l găsesc."]          
                }, 
                new Word {
                    Id = 27,
                    Name = "mameluc",
                    Definitions = [" 1. (Figurat:) Om lipsit de personalitate, de păreri proprii", "2. Soldat de cavalerie din garda personală a sultanilor din Egipt"],
                    Examples = ["Nu stau la taclale cu mameluci, nu învăț nimic nou așa."]          
                }, 
                new Word {
                    Id = 28,
                    Name = "mistificator",
                    Definitions = ["Persoană care falsifică, denaturează, contraface adevărul"],
                    Examples = ["Să nu ai încredere în nimic din ce spune, e un mistificator notoriu."]          
                }, 
                new Word {
                    Id = 29,
                    Name = "a (se) devergonda",
                    Definitions = ["a se destrăbăla, a se dezmăța, a se desfrîna, a se strica"],
                    Examples = ["Nu ştiu unde îi e capul, bea și se devergondează fără măsură."]          
                }, 
                new Word {
                    Id = 30,
                    Name = "veros",
                    Definitions = ["necinstit, suspect"],
                    Examples = ["Mi-e lehamite de sistemul ăsta plin de politicieni veroși."]          
                }, 
            };

            context.Words.AddRange(words);
            context.SaveChanges();
        }

        public static async Task InitializeUsers(UserManager<User> userManager) {
            if (userManager.Users.Any()) return;

            var user = new User
            {
                UserName = "DaveDaBrave",
                Email = "davedabrave@gmail.com"
            };

            await userManager.CreateAsync(user, "Manofmyworld123!");
            await userManager.AddToRolesAsync(user, new[] {"Member", "Admin"});

            var user2 = new User
            {
                UserName = "Johny",
                Email = "johntho@gmail.com"
            };

            await userManager.CreateAsync(user2, "Manofmyworld123!");
            await userManager.AddToRoleAsync(user2, "Member");
        }

        public static void InitializeThoughts(MyDbContext context)
        {
            if (context.Thoughts.Any()) return;

            var thoughts = new List<Thought> {
                new Thought {
                    Id = 1,
                    Content = "Oare nisipul#e de fapt#multe pietre#mici?"
                },
                new Thought {
                    Id = 2,
                    Content = "Dar bratul#nu-ti e asa puternic,#precum e visul#de inalt."
                },
                new Thought {
                    Id = 3,
                    Content = "Auzi bre#cat ridici la piept?#Cat trebuie,#boss."
                },
            };

            context.Thoughts.AddRange(thoughts);
            context.SaveChanges();
        }
    }
}