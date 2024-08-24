export default function FormErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <p
      className={
        message &&
        "rounded bg-red-200 px-3 py-1.5 text-center text-base text-red-800"
      }
    >
      {message}
    </p>
  );
}
