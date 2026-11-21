const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ecommerce-platform PostgreSQL database...');

  const categories = [
    { name: 'Audio', slug: 'audio', description: 'Studio grade reference monitors and headphones' },
    { name: 'Wearables', slug: 'wearables', description: 'Biometric telemetry and spatial interfaces' },
    { name: 'Computing', slug: 'computing', description: 'Custom desktop workstations and laptops' },
    { name: 'Photography', slug: 'photography', description: 'Medium format mirrorless optics and sensors' }
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: { name: c.name, slug: c.slug, description: c.description }
    });
  }

  const audioCat = await prisma.category.findUnique({ where: { slug: 'audio' } });

  const sampleProducts = [
    {
      name: 'Apex Studio Pro Wireless Headphones',
      slug: 'apex-studio-pro-wireless-headphones',
      description: 'Custom 50mm beryllium drivers delivering electrostatic transient speed with ultra-low THD.',
      price: 499.00,
      compareAtPrice: 599.00,
      inventory: 48,
      rating: 4.9,
      reviewsCount: 142,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
      tags: ['Wireless', 'Active Noise Cancelling', 'Beryllium'],
      isFeatured: true,
      categoryId: audioCat.id,
    },
    {
      name: 'Apex Reference Nearfield Studio Monitors',
      slug: 'apex-reference-nearfield-studio-monitors',
      description: 'DSP-tuned bi-amplified 8-inch carbon fiber cone studio monitors for acoustic mastery.',
      price: 899.00,
      compareAtPrice: 1050.00,
      inventory: 22,
      rating: 4.95,
      reviewsCount: 88,
      images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'],
      tags: ['Bi-Amped', 'DSP', 'Class-D'],
      isFeatured: true,
      categoryId: audioCat.id,
    }
  ];

  for (const p of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { price: p.price, inventory: p.inventory },
      create: p
    });
  }

  const count = await prisma.product.count();
  console.log(`Successfully seeded ecommerce-platform! Total products in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
