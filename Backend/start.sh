#!/bin/sh

# Função para executar as migrações e seed do Laravel
executar_migracoes() {
    php artisan migrate --seed
}

# Instalação das dependências do Composer
composer install
if [ $? -ne 0 ]; then
    echo "Erro ao instalar as dependências do Composer."
    exit 1
fi

# Geração da chave do Laravel
php artisan key:generate
if [ $? -ne 0 ]; then
    echo "Erro ao gerar a chave do Laravel."
    exit 1
fi

# Número máximo de tentativas
max_tentativas=3

# Loop para tentar executar as migrações e seed
for tentativa in $(seq 1 $max_tentativas); do
    echo "Tentativa $tentativa de $max_tentativas"

    # Chamar a função para executar as migrações
    executar_migracoes

    # Verificar se o comando foi bem-sucedido
    if [ $? -eq 0 ]; then
        echo "Migrações e seed do Laravel executadas com sucesso."
        break
    else
        echo "Erro ao executar as migrações e seed do Laravel."

        # Aguardar por um intervalo antes da próxima tentativa
        sleep 5
    fi
done

# Inicialização do servidor Laravel
php artisan serve -v --host 0.0.0.0
if [ $? -ne 0 ]; then
    echo "Erro ao iniciar o servidor Laravel."
    exit 1
fi

# Se chegou até aqui, tudo foi executado com sucesso
echo "Script executado com sucesso."
exit 0
