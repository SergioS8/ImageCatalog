namespace ImageCatalog.Models
{
    public class ImageItem
    {
        public int Id => this.GetHashCode();
        public string Name { get; set; }
        public string Path {get; set; }

        public override bool Equals(object obj)
        {
            var objAsImage = obj as ImageItem;
            if (objAsImage == null)
                return false;

            return Equals(objAsImage);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = 7;
                hash = hash * 18 + Name.GetHashCode() + Path.GetHashCode();
                return hash;
            }
        }
    }
}
