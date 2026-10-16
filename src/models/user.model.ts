import { pool } from "../config/db";

export interface User {
  userId?: number;
  jobTitleName?: string;
  firstName: string;
  lastName: string;
  preferredFullName?: string;
  employeeCode?: string;
  region: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface UserFilterOptions {
  search?: string;
  region?: string;
}

export const UserModel = {
  findAll: async (filters?: UserFilterOptions): Promise<User[]> => {
    let query = `
      SELECT 
        user_id AS "userId",
        job_title_name AS "jobTitleName",
        first_name AS "firstName",
        last_name AS "lastName",
        preferred_full_name AS "preferredFullName",
        employee_code AS "employeeCode",
        region,
        phone_number AS "phoneNumber",
        email_address AS "emailAddress"
      FROM users
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramIndex = 1;

    if (filters?.region && filters.region !== "all") {
      query += ` AND LOWER(region) = LOWER($${paramIndex++})`;
      values.push(filters.region.trim());
    }

    if (filters?.search && filters.search.trim() !== "") {
      const q = `%${filters.search.trim().toLowerCase()}%`;
      query += ` AND (
        LOWER(first_name) LIKE $${paramIndex} OR
        LOWER(last_name) LIKE $${paramIndex} OR
        LOWER(CONCAT(first_name, ' ', last_name)) LIKE $${paramIndex} OR
        LOWER(COALESCE(email_address, '')) LIKE $${paramIndex} OR
        LOWER(region) LIKE $${paramIndex} OR
        LOWER(COALESCE(job_title_name, '')) LIKE $${paramIndex}
      )`;
      values.push(q);
      paramIndex++;
    }

    query += ` ORDER BY user_id ASC`;

    const res = await pool.query(query, values);
    return res.rows;
  },

  findById: async (id: number): Promise<User | null> => {
    const res = await pool.query(
      `SELECT 
        user_id AS "userId",
        job_title_name AS "jobTitleName",
        first_name AS "firstName",
        last_name AS "lastName",
        preferred_full_name AS "preferredFullName",
        employee_code AS "employeeCode",
        region,
        phone_number AS "phoneNumber",
        email_address AS "emailAddress"
      FROM users
      WHERE user_id = $1`,
      [id]
    );

    return res.rows[0] || null;
  },

  create: async (userData: Partial<User>): Promise<User> => {
    const res = await pool.query(
      `INSERT INTO users (
        first_name,
        last_name,
        region,
        job_title_name,
        preferred_full_name,
        employee_code,
        phone_number,
        email_address
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING 
        user_id AS "userId",
        job_title_name AS "jobTitleName",
        first_name AS "firstName",
        last_name AS "lastName",
        preferred_full_name AS "preferredFullName",
        employee_code AS "employeeCode",
        region,
        phone_number AS "phoneNumber",
        email_address AS "emailAddress"`,
      [
        userData.firstName,
        userData.lastName,
        userData.region || "USA",
        userData.jobTitleName || null,
        userData.preferredFullName || null,
        userData.employeeCode || null,
        userData.phoneNumber || null,
        userData.emailAddress || null,
      ]
    );

    return res.rows[0];
  },

  update: async (id: number, updateData: Partial<User>): Promise<User | null> => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updateData.firstName !== undefined) {
      fields.push(`first_name = $${paramIndex++}`);
      values.push(updateData.firstName);
    }
    if (updateData.lastName !== undefined) {
      fields.push(`last_name = $${paramIndex++}`);
      values.push(updateData.lastName);
    }
    if (updateData.region !== undefined) {
      fields.push(`region = $${paramIndex++}`);
      values.push(updateData.region);
    }
    if (updateData.jobTitleName !== undefined) {
      fields.push(`job_title_name = $${paramIndex++}`);
      values.push(updateData.jobTitleName);
    }
    if (updateData.preferredFullName !== undefined) {
      fields.push(`preferred_full_name = $${paramIndex++}`);
      values.push(updateData.preferredFullName);
    }
    if (updateData.emailAddress !== undefined) {
      fields.push(`email_address = $${paramIndex++}`);
      values.push(updateData.emailAddress);
    }
    if (updateData.phoneNumber !== undefined) {
      fields.push(`phone_number = $${paramIndex++}`);
      values.push(updateData.phoneNumber);
    }
    if (updateData.employeeCode !== undefined) {
      fields.push(`employee_code = $${paramIndex++}`);
      values.push(updateData.employeeCode);
    }

    if (fields.length === 0) {
      return await UserModel.findById(id);
    }

    values.push(id);
    const res = await pool.query(
      `UPDATE users 
       SET ${fields.join(", ")} 
       WHERE user_id = $${paramIndex}
       RETURNING 
        user_id AS "userId",
        job_title_name AS "jobTitleName",
        first_name AS "firstName",
        last_name AS "lastName",
        preferred_full_name AS "preferredFullName",
        employee_code AS "employeeCode",
        region,
        phone_number AS "phoneNumber",
        email_address AS "emailAddress"`,
      values
    );

    return res.rows[0] || null;
  },

  delete: async (id: number): Promise<boolean> => {
    const res = await pool.query(`DELETE FROM users WHERE user_id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  },
};
