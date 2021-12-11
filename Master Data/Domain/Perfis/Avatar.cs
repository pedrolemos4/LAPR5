using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Avatar : IValueObject
    {
        public string avatar { get;  private set; }

        public bool Active{ get;  private set; }

        private Avatar()
        {
            this.Active = true;
        }

        public Avatar(string avatar)
        {
            this.avatar = avatar;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}