const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  // Criar permissões padrão
  const permissions = [
    { permission: 0, name: 'Dono do Sistema', comentario: 'Permissão total' },
    { permission: 1, name: 'Dono da Empresa', comentario: 'Permissão para gerenciar a empresa' },
    { permission: 2, name: 'Funcionário/Profissional', comentario: 'Permissão para gerenciar atendimentos' },
    { permission: 3, name: 'Cliente', comentario: 'Permissão para agendar serviços' },
  ];

  for (const perm of permissions) {
    await prisma.permissionsUser.create({
      data: perm,
    });
  }

  const passwordHash = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);
  // Criar usuário dono do sistema
  await prisma.superAdmin.create({
    data: {
      password: passwordHash, // Certifique-se de usar um hash de senha em produção
      email: 'admin@admin.com',
    },
  });
  
  await prisma.gatewayPayment.create({
    data: {
      nome: 'MercadoPago',
      ativo: true,
      dados: {
        "access_token": "",
        "public_key": ""
      },
    }
  });
  await prisma.gatewayPayment.create({
    data: {
      nome: 'PixManual',
      ativo: false,
      dados: {
        "chave_pix": ""
      },
    }
  });
  
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });