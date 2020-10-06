using System.Collections.Generic;

namespace ImageCatalog.Models
{
    public class Catalog
    {
        public int Id => this.GetHashCode();
        public string Name { get; set; }
        public List<ImageItem> Items { get; set; }

        public override bool Equals(object obj)
        {
            var objAsCatalog = obj as Catalog;
            if (objAsCatalog == null)
                return false;

            return Equals(objAsCatalog);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = 7;
                hash = hash * 18 + Name.GetHashCode();
                return hash;
            }
        }
    }
}
