import { defineAbility } from "@casl/ability";

export type Role = "admin" | "staff";

export type Identity = {
  id: string;
  email: string;
  role: Role;
};

export default function defineAbilityFor(user?: Identity) {
  return defineAbility((can) => {
    can("read", "Article");
    can("read", "Items");

    if (user && user?.role == "admin") {
      can("read", "Dashboard");
      can("manage", "ArrivalDate");
      can("manage", "Branch");
      can("manage", "User");
      can("manage", "Price");
      can("manage", "Config");
      can("update", "Article", ["title", "description"], { authorId: user.id });

      can("update", "Article", ["published"]);

      can("leave", "Comment");
      can("update", "Comment", { authorId: user.id });
    }
  });
}
