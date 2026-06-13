import bcrypt from "bcryptjs";

class Hash_function{
    async hashPassword(password, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
    }

    // Проверка пароля (не «обратный хеш», а сравнение)
    async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
    }

}

const HASH_FUNCTION = new Hash_function

export default HASH_FUNCTION