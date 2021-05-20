import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { usePersons } from "nampi-use-api";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../../components/Heading";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { ItemNav } from "../../components/ItemNav";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { Layout } from "../../components/Layout";

export const Persons = () => {
  const [text, setText] = useState<string>("");
  const { initialized, loading, data, nav, total } = usePersons({
    query: { orderBy: "label", text },
  });
  return (
    <Layout fluid>
      <Heading>
        {total === undefined ? (
          <FormattedMessage
            description="Persons page heading without totals"
            defaultMessage="Persons"
          />
        ) : (
          <FormattedMessage
            description="Persons page heading with totals"
            defaultMessage="Persons ({total})"
            values={{ total }}
          />
        )}
      </Heading>
      <div className="my-4">
        <Icon icon={faSearch} />
        <Input
          className="ml-2"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></Input>
      </div>
      <ItemNav className="my-4" disabled={!initialized || loading} nav={nav} />
      {!initialized || !data ? (
        <LoadingPlaceholder />
      ) : (
        <ul>
          {data.map((person) => {
            const label = serializeLabels({labels: person.labels});
            const born = serializeEventDates(person.bornIn, "Y");
            return (
              <li key={person.idLocal}>
                <Link to={"person/" + person.idLocal} className="text-gray-800">
                  {label + (born ? ` (${born})` : "")}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
};
