import { type Token, token } from "styled-system/tokens";

const isToken = (value: string): value is Token => {
	// token()関数を呼び出して、undefinedが返されないかチェック
	// tokensオブジェクトにキーが存在する場合、有効なToken
	const result = token(value as Token, undefined);
	return result !== undefined;
};

/**
 * トークンキーから値を取得
 * @param tokenKey - トークンキー（themeから取得する）
 * @returns トークンの実際の値（CSS変数または色値など）
 * @throws 無効なトークンキーの場合にエラーをスロー
 */
export const getToken = (tokenKey: string) => {
	const tokenName =
		tokenKey.startsWith("{") && tokenKey.endsWith("}")
			? tokenKey.slice(1, -1)
			: tokenKey;

	if (!isToken(tokenName)) throw new Error(`🔥 Invalid token: ${tokenKey}`);

	return token(tokenName as Token);
};
