import * as rules from "@terra-money/log-finder-ruleset";
import * as rulesTypes from "@terra-money/log-finder/dist/types";

export function getTypeFromCanonicalMsgs(
  actionMatchedMsg: rules.LogFinderActionResult[][],
  index?: number
): { type: string; value: rulesTypes.Attributes } | null {
  const m = actionMatchedMsg
    ? actionMatchedMsg
        .map((actionMatchedMsg) =>
          actionMatchedMsg.map(({ transformed }) => transformed)
        )
        .flat(2)
    : [];
  const item = m.length > 0 ? m[index ?? 0] : null;
  return item
    ? { type: item.payload.type, value: item.payload.attributes }
    : null;
}

export const readFileUrl = async (url: string): Promise<string> => {
  //console.log('read file')
  const response = await fetch(url);
  const data = await response.blob();
  let metadata = {
    type: "application/wasm",
  };
  let file = new File([data], "test.wasm", metadata);
  return readFile(file);
};

export const readTextUrl = async (url: string): Promise<string> => {
  //console.log('read file')
  const response = await fetch(url);
  const data = await response.text();
  if (!data) {
    console.error("failed to load text from url:", url);
  }
  return data;
};

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      let encoded = reader.result?.toString().replace(/^data:(.*,)?/, "") ?? "";
      if (encoded.length % 4 > 0)
        encoded += "=".repeat(4 - (encoded.length % 4));

      resolve(encoded);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const parseINT = (query: string) => {
  try {
    return parseInt(query);
  } catch (ex) {
    console.error("PARSEINT failed", { ex });
    return;
  }
};

export const validateMsg = (msg: string): string => {
  let result = "";
  try {
    JSON.parse(msg);
  } catch (ex: any) {
    result = ex.message;
  }
  return result;
};
