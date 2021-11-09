using DDDSample1.Domain.Shared;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Pais : IValueObject
    {
        public string pais { get; private set; }

        public bool Active { get; private set; }

        public Pais(string pais)
        {
            setPais(pais);
            this.Active = true;
        }
        private void setPais(string pais)
        {
            /*Program p = new Program();
            
//       
//       
//             List<string> listaPaises = new List<string>();
            
//             string text = System.IO.File.ReadAllText(@"listaPaises.txt");
//             string[] vs = text.Split(";");

//             for (int i = 0; i < vs.Length; i++){
//                 listaPaises.Add(vs[i]);
//             }
//             return listaPaises;
//         }

//             List<string> listaPaises = p.listaPaises;
            if(listaPaises.Contains(pais)){
                this.pais=pais;
            }else{
                throw new BusinessRuleValidationException("Invalid country.");
            }*/
        }

    }
}