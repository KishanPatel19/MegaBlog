import conf from "../conf/conf.js";
import { Client, TablesDB, Storage, ID, Query } from "appwrite";

export class AppwriteService {
  client = new Client();
  tables;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tables = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  // ================= POSTS (TablesDB) =================

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tables.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("createPost error", error);
    }
  }

  async getPosts() {
    try {
      return await this.tables.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
      });
    } catch (error) {
      console.log("getPosts error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.tables.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("getPost error", error);
    }
  }

  async updatePost(slug, data) {
    try {
      return await this.tables.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data,
      });
    } catch (error) {
      console.log("updatePost error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tables.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("deletePost error", error);
      return false;
    }
  }

  // ================= FILE STORAGE =================

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("uploadFile error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("deleteFile error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId,
    });
  }
}

const service = new AppwriteService();
export default service;