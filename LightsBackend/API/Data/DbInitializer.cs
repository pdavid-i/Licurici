using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(MyDbContext context, UserManager<User> userManager) {
            InitializeWords(context);
            await InitializeUsers(context, userManager);
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
                }
            };

            context.Words.AddRange(words);
            context.SaveChanges();
        }

        public static async Task InitializeUsers(MyDbContext context, UserManager<User> userManager) {
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
    }
}