const Table = ({ headings, data, classname }) => {
  return (
    <table className={`border-collapse border border-gray-300 ${classname}`}>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <td
              key={index}
              className={`border-[1px] border-black p-2 font-semibold bg-secondary`}
              style={{ width: `${heading.width}` }}
            >
              {heading.label}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={headings.length}
              className="border border-black p-2 text-center"
            >
              No data
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headings.map((heading, headingIndex) => (
                <td key={headingIndex} className="border border-black p-2">
                  {typeof row[heading.id] === "string" ? (
                    <p className="!text-[13px]">{row[heading.id]}</p>
                  ) : (
                    row[heading.id]
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
