using DDDSample1.Domain.Shared;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Pais : IValueObject
    {
        public string Country { get; private set; }

        public bool Active { get; private set; }

        private Pais()
        {
            this.Active = true;
        }

        public Pais(string pais)
        {
            setPais(pais);
            this.Active = true;
        }
        private void setPais(string pais)
        {
            if (pais.Length != 0)
            {
                try
                {
                    CultureInfo[] getCultureInfo = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

                    RegionInfo GetRegionInfo = new RegionInfo(new CultureInfo(pais).Name);

                    this.Country = GetRegionInfo.EnglishName;
                }
                catch
                {
                    throw new BusinessRuleValidationException("Invalid country.");
                }
            } else{
                this.Country = pais;
            }
        }

    }
}